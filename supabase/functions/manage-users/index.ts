import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.78.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      data: { user: callerUser },
    } = await supabaseAdmin.auth.getUser(authHeader.replace("Bearer ", ""));

    const { action, ...payload } = await req.json();

    if (action === "create_user") {
      const { email, password, full_name, user_type, role, client_id } = payload;

      if (!email || !password || !full_name || !user_type) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (callerUser) {
        const { data: adminCheck } = await supabaseAdmin
          .from("admin_users")
          .select("id, role")
          .eq("auth_id", callerUser.id)
          .eq("is_active", true)
          .maybeSingle();

        if (!adminCheck) {
          return new Response(
            JSON.stringify({ error: "Only admins can create users" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (user_type === "admin" && adminCheck.role !== "owner") {
          return new Response(
            JSON.stringify({ error: "Only owners can create admin users" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      const { data: authUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            full_name,
            user_type,
            role: role || "client",
          },
        });

      if (createError) {
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (user_type === "admin") {
        const { error: profileError } = await supabaseAdmin
          .from("admin_users")
          .insert({
            auth_id: authUser.user.id,
            email: email.toLowerCase(),
            password_hash: "SUPABASE_AUTH",
            full_name,
            role: role || "admin",
            is_active: true,
          });

        if (profileError) {
          await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
          return new Response(
            JSON.stringify({ error: profileError.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } else if (user_type === "client") {
        if (!client_id) {
          await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
          return new Response(
            JSON.stringify({ error: "client_id is required for client users" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { error: profileError } = await supabaseAdmin
          .from("client_users")
          .insert({
            auth_id: authUser.user.id,
            client_id,
            email: email.toLowerCase(),
            password_hash: "SUPABASE_AUTH",
            full_name,
            is_active: true,
            email_verified: true,
            requires_password_change: false,
          });

        if (profileError) {
          await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
          return new Response(
            JSON.stringify({ error: profileError.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      return new Response(
        JSON.stringify({ user_id: authUser.user.id, email: authUser.user.email }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "migrate_user") {
      const { email, password, user_type, profile_id } = payload;

      if (!email || !password || !user_type || !profile_id) {
        return new Response(
          JSON.stringify({ error: "Missing required fields for migration" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: authUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { user_type },
        });

      if (createError) {
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const table = user_type === "admin" ? "admin_users" : "client_users";
      const { error: linkError } = await supabaseAdmin
        .from(table)
        .update({ auth_id: authUser.user.id })
        .eq("id", profile_id);

      if (linkError) {
        await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
        return new Response(
          JSON.stringify({ error: linkError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ user_id: authUser.user.id, migrated: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete_user") {
      const { auth_user_id } = payload;

      if (!auth_user_id) {
        return new Response(
          JSON.stringify({ error: "auth_user_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (callerUser) {
        const { data: adminCheck } = await supabaseAdmin
          .from("admin_users")
          .select("role")
          .eq("auth_id", callerUser.id)
          .eq("is_active", true)
          .maybeSingle();

        if (!adminCheck || adminCheck.role !== "owner") {
          return new Response(
            JSON.stringify({ error: "Only owners can delete users" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      const { error: deleteError } =
        await supabaseAdmin.auth.admin.deleteUser(auth_user_id);

      if (deleteError) {
        return new Response(
          JSON.stringify({ error: deleteError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ deleted: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
