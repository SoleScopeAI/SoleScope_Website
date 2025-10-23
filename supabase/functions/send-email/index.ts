import { corsHeaders } from '../_shared/cors.ts';

interface EmailRequest {
  type: 'contact' | 'proposal' | 'newsletter';
  data: any;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { type, data }: EmailRequest = await req.json();
    
    // Get environment variables
    const POSTMARK_API_TOKEN = Deno.env.get('POSTMARK_API_TOKEN');
    const RECIPIENT_EMAIL = 'kevin@solescope.co.uk';
    
    if (!POSTMARK_API_TOKEN) {
      throw new Error('Postmark API token not configured');
    }

    let subject = '';
    let htmlContent = '';

    // Common email styles
    const emailStyles = `
      <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #6C3EF0, #5A33C8); padding: 30px 40px; text-align: center; }
        .logo { width: 40px; height: 40px; margin-bottom: 15px; }
        .company-name { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 0.5px; }
        .content { padding: 40px; background-color: #ffffff; }
        .form-title { color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 30px 0; text-align: center; }
        .field-group { margin-bottom: 25px; }
        .field-label { color: #6C3EF0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: block; }
        .field-value { color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0; padding: 12px 16px; background-color: #f8f9fa; border-left: 4px solid #6C3EF0; border-radius: 4px; }
        .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .message-field { background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6C3EF0; margin: 20px 0; }
        .message-text { color: #1a1a1a; font-size: 16px; line-height: 1.7; margin: 0; white-space: pre-wrap; }
        .tags-container { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .tag { background-color: #6C3EF0; color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .footer { background-color: #1a1a1a; padding: 30px 40px; text-align: center; }
        .footer-text { color: #9ca3af; font-size: 14px; margin: 0; line-height: 1.6; }
        .footer-link { color: #6C3EF0; text-decoration: none; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 30px 0; }
        .highlight-box { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .priority-badge { background-color: #ef4444; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; display: inline-block; margin-bottom: 15px; }
        @media only screen and (max-width: 600px) {
          .field-grid { grid-template-columns: 1fr; }
          .content { padding: 30px 20px; }
          .header { padding: 25px 20px; }
        }
      </style>
    `;

    // Generate email content based on form type
    switch (type) {
      case 'contact':
        subject = `🔥 New Contact Form Submission from ${data.name}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            ${emailStyles}
          </head>
          <body>
            <div class="email-container">
              <!-- Header -->
              <div class="header">
                <div class="logo" style="width: 40px; height: 40px; margin: 0 auto 15px auto; background-color: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px; font-weight: bold;">SS</span>
                </div>
                <h1 class="company-name">SoleScope Studio & Design</h1>
              </div>

              <!-- Content -->
              <div class="content">
                <div class="priority-badge">NEW CONTACT INQUIRY</div>
                <h2 class="form-title">Contact Form Submission</h2>
                
                <div class="field-grid">
                  <div class="field-group">
                    <label class="field-label">Full Name</label>
                    <p class="field-value">${data.name}</p>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Email Address</label>
                    <p class="field-value"><a href="mailto:${data.email}" style="color: #6C3EF0; text-decoration: none;">${data.email}</a></p>
                  </div>
                </div>

                ${data.business ? `
                <div class="field-grid">
                  <div class="field-group">
                    <label class="field-label">Business Name</label>
                    <p class="field-value">${data.business}</p>
                  </div>
                  ${data.phone ? `
                  <div class="field-group">
                    <label class="field-label">Phone Number</label>
                    <p class="field-value"><a href="tel:${data.phone}" style="color: #6C3EF0; text-decoration: none;">${data.phone}</a></p>
                  </div>
                  ` : '<div></div>'}
                </div>
                ` : ''}

                ${data.service ? `
                <div class="field-group">
                  <label class="field-label">Service of Interest</label>
                  <p class="field-value">${data.service}</p>
                </div>
                ` : ''}

                ${data.callbackRequested ? `
                <div class="highlight-box">
                  <strong style="color: #0ea5e9; font-size: 16px;">📞 CALLBACK REQUESTED</strong>
                  ${data.preferredTime ? `<p style="margin: 10px 0 0 0; color: #1a1a1a;"><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
                </div>
                ` : ''}

                <div class="divider"></div>

                <div class="field-group">
                  <label class="field-label">Message</label>
                  <div class="message-field">
                    <p class="message-text">${data.message}</p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p class="footer-text">
                  This inquiry was submitted via the SoleScope Studio & Design contact form.<br>
                  <a href="https://solescope.co.uk" class="footer-link">solescope.co.uk</a> | 
                  <a href="mailto:hello@solescope.ai" class="footer-link">hello@solescope.ai</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'proposal':
        subject = `🚀 New Automation Proposal Request from ${data.company}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Automation Proposal Request</title>
            ${emailStyles}
          </head>
          <body>
            <div class="email-container">
              <!-- Header -->
              <div class="header">
                <div class="logo" style="width: 40px; height: 40px; margin: 0 auto 15px auto; background-color: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px; font-weight: bold;">SS</span>
                </div>
                <h1 class="company-name">SoleScope Studio & Design</h1>
              </div>

              <!-- Content -->
              <div class="content">
                <div class="priority-badge">AUTOMATION PROPOSAL REQUEST</div>
                <h2 class="form-title">Custom AI Automation Inquiry</h2>
                
                <div class="field-grid">
                  <div class="field-group">
                    <label class="field-label">Contact Name</label>
                    <p class="field-value">${data.name}</p>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Email Address</label>
                    <p class="field-value"><a href="mailto:${data.email}" style="color: #6C3EF0; text-decoration: none;">${data.email}</a></p>
                  </div>
                </div>

                <div class="field-grid">
                  <div class="field-group">
                    <label class="field-label">Company Name</label>
                    <p class="field-value">${data.company}</p>
                  </div>
                  ${data.website ? `
                  <div class="field-group">
                    <label class="field-label">Website</label>
                    <p class="field-value"><a href="${data.website}" style="color: #6C3EF0; text-decoration: none;" target="_blank">${data.website}</a></p>
                  </div>
                  ` : '<div></div>'}
                </div>

                ${data.turnover ? `
                <div class="field-group">
                  <label class="field-label">Business Turnover</label>
                  <p class="field-value">${data.turnover}</p>
                </div>
                ` : ''}

                ${data.dontKnow ? `
                <div class="highlight-box">
                  <strong style="color: #0ea5e9; font-size: 16px;">💡 CLIENT NEEDS CONSULTATION</strong>
                  <p style="margin: 10px 0 0 0; color: #1a1a1a;">This client has indicated they need help determining what to automate.</p>
                </div>
                ` : ''}

                ${data.tools && data.tools.length > 0 ? `
                <div class="field-group">
                  <label class="field-label">Current Tools & Platforms</label>
                  <div class="field-value">
                    <div class="tags-container">
                      ${data.tools.map((tool: string) => `<span class="tag">${tool}</span>`).join('')}
                    </div>
                  </div>
                </div>
                ` : ''}

                ${data.otherTools ? `
                <div class="field-group">
                  <label class="field-label">Additional Tools</label>
                  <p class="field-value">${data.otherTools}</p>
                </div>
                ` : ''}

                ${data.automations && data.automations.length > 0 ? `
                <div class="field-group">
                  <label class="field-label">Selected Automations</label>
                  <div class="field-value">
                    <div class="tags-container">
                      ${data.automations.map((automation: string) => `<span class="tag">${automation}</span>`).join('')}
                    </div>
                  </div>
                </div>
                ` : ''}

                <div class="divider"></div>

                <div class="field-group">
                  <label class="field-label">Project Description</label>
                  <div class="message-field">
                    <p class="message-text">${data.description}</p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p class="footer-text">
                  This proposal request was submitted via the SoleScope Studio & Design automation services page.<br>
                  <a href="https://solescope.co.uk" class="footer-link">solescope.co.uk</a> | 
                  <a href="mailto:hello@solescope.ai" class="footer-link">hello@solescope.ai</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'newsletter':
        subject = `📧 New Newsletter Subscription`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Newsletter Subscription</title>
            ${emailStyles}
          </head>
          <body>
            <div class="email-container">
              <!-- Header -->
              <div class="header">
                <div class="logo" style="width: 40px; height: 40px; margin: 0 auto 15px auto; background-color: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px; font-weight: bold;">SS</span>
                </div>
                <h1 class="company-name">SoleScope Studio & Design</h1>
              </div>

              <!-- Content -->
              <div class="content">
                <div class="priority-badge" style="background-color: #22c55e;">NEW SUBSCRIBER</div>
                <h2 class="form-title">Newsletter Subscription</h2>
                
                <div class="field-group">
                  <label class="field-label">Email Address</label>
                  <p class="field-value"><a href="mailto:${data.email}" style="color: #6C3EF0; text-decoration: none;">${data.email}</a></p>
                </div>

                <div class="highlight-box">
                  <p style="margin: 0; color: #1a1a1a; font-size: 16px;">
                    <strong>Action Required:</strong> Add this email to your newsletter list and send a welcome email.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p class="footer-text">
                  This subscription was submitted via the SoleScope Studio & Design blog page.<br>
                  <a href="https://solescope.co.uk" class="footer-link">solescope.co.uk</a> | 
                  <a href="mailto:hello@solescope.ai" class="footer-link">hello@solescope.ai</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      default:
        throw new Error('Invalid email type');
    }

    // Send email using Postmark API
    const emailResponse = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_TOKEN,
      },
      body: JSON.stringify({
        From: 'noreply@solescope.co.uk',
        To: RECIPIENT_EMAIL,
        Subject: subject,
        HtmlBody: htmlContent,
        MessageStream: 'outbound'
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Postmark error:', errorData);
      throw new Error(`Failed to send email: ${errorData.Message || 'Unknown error'}`);
    }

    const responseData = await emailResponse.json();
    console.log('Email sent successfully:', responseData.MessageID);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});