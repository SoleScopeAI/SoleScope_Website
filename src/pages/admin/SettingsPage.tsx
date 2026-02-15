import React, { useState, useEffect } from 'react';
import {
  User, Bell, Shield, Key, Users, Plus, Crown, AlertCircle,
  Check, Save, Download, Eye, EyeOff, UserCog, ToggleLeft, ToggleRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminUserService, AdminUserListItem } from '../../lib/adminUserService';
import { supabase } from '../../lib/supabase';
import AddAdminUserModal from '../../components/admin/AddAdminUserModal';

const SettingsPage = () => {
  const { adminUser, isOwner, refreshUser } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data Export', icon: Download },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-600/20 to-cyan-600/20 text-white border border-teal-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'team' && <TeamTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'data' && <DataExportTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const { adminUser, refreshUser } = useAdminAuth();
  const [fullName, setFullName] = useState(adminUser?.full_name || '');
  const [email, setEmail] = useState(adminUser?.email || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ full_name: fullName.trim() })
      .eq('id', adminUser?.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      if (email.trim().toLowerCase() !== adminUser?.email) {
        const { error: authError } = await supabase.auth.updateUser({ email: email.trim().toLowerCase() });
        if (authError) {
          setError('Profile name saved but email update failed: ' + authError.message);
          setSaving(false);
          return;
        }
        await supabase.from('admin_users').update({ email: email.trim().toLowerCase() }).eq('id', adminUser?.id);
      }
      setSuccess(true);
      await refreshUser();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <input
            type="text"
            value={adminUser?.role || ''}
            disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed capitalize"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-sm">Profile updated successfully</span>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SecurityTab = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    setError('');
    setSuccess(false);

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSaving(true);
    const { error: authError } = await supabase.auth.updateUser({ password: newPassword });

    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Security Settings</h2>
      <p className="text-gray-400">Update your password. You are signed in via Supabase Auth.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 8 characters"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
            />
            <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
            />
            <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-sm">Password updated successfully</span>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleChangePassword}
            disabled={saving || !newPassword || !confirmPassword}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            <Key className="w-5 h-5" />
            <span>{saving ? 'Updating...' : 'Update Password'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamTab = () => {
  const { adminUser, isOwner } = useAdminAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [changingRoleId, setChangingRoleId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const users = await adminUserService.getAllAdminUsers();
    setAdminUsers(users);
    setLoading(false);
  };

  const handleToggleStatus = async (userId: string, currentlyActive: boolean) => {
    if (!adminUser?.id) return;
    setTogglingId(userId);
    setError('');
    const result = await adminUserService.toggleAdminStatus(adminUser.id, userId, !currentlyActive);
    if (!result.success) setError(result.error || 'Failed to update status');
    else await fetchUsers();
    setTogglingId(null);
  };

  const handleRoleChange = async (userId: string, newRole: 'owner' | 'admin' | 'manager') => {
    if (!adminUser?.id) return;
    setChangingRoleId(userId);
    setError('');
    const result = await adminUserService.updateAdminRole(adminUser.id, userId, newRole);
    if (!result.success) setError(result.error || 'Failed to update role');
    else await fetchUsers();
    setChangingRoleId(null);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'admin': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Management</h2>
          <p className="text-gray-400 mt-1">Manage admin users and their permissions</p>
        </div>
        {isOwner() && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Admin</span>
          </button>
        )}
      </div>

      {!isOwner() && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 font-medium">View-Only Access</p>
            <p className="text-sm text-blue-300 mt-1">
              Your role is <span className="font-semibold capitalize">{adminUser?.role}</span>. Only owners can manage admin users.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading team members...</p>
        </div>
      ) : adminUsers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No admin users found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {adminUsers.map((user) => (
            <div key={user.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    user.role === 'owner'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : user.role === 'admin'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {user.role === 'owner' ? <Crown className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                      <h3 className="text-white font-semibold">{user.full_name}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                      {!user.is_active && (
                        <span className="px-3 py-1 rounded-lg text-xs font-medium border bg-red-500/20 text-red-400 border-red-500/30">Inactive</span>
                      )}
                      {user.id === adminUser?.id && (
                        <span className="px-3 py-1 rounded-lg text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">You</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Last login: {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>

                {isOwner() && user.id !== adminUser?.id && (
                  <div className="flex items-center space-x-3 ml-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'owner' | 'admin' | 'manager')}
                      disabled={changingRoleId === user.id}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 [&>option]:bg-gray-900 disabled:opacity-50"
                    >
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>

                    <button
                      onClick={() => handleToggleStatus(user.id, user.is_active)}
                      disabled={togglingId === user.id}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                      title={user.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {user.is_active ? (
                        <ToggleRight className="w-6 h-6 text-green-400" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-500" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddAdminUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => { setShowAddModal(false); fetchUsers(); }}
      />
    </div>
  );
};

const NotificationsTab = () => {
  const { adminUser } = useAdminAuth();
  const [prefs, setPrefs] = useState({
    email_notifications: true,
    new_client_alerts: true,
    payment_notifications: true,
    project_updates: true,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadPrefs();
  }, [adminUser?.id]);

  const loadPrefs = async () => {
    if (!adminUser?.id) return;
    const { data } = await supabase
      .from('admin_users')
      .select('notification_preferences')
      .eq('id', adminUser.id)
      .maybeSingle();

    if (data?.notification_preferences) {
      setPrefs({ ...prefs, ...data.notification_preferences });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('admin_users')
      .update({ notification_preferences: prefs })
      .eq('id', adminUser?.id);

    setSuccess(true);
    setSaving(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  const toggleItems = [
    { key: 'email_notifications', label: 'Email Notifications', desc: 'Receive email updates for important events' },
    { key: 'new_client_alerts', label: 'New Client Alerts', desc: 'Get notified when new clients sign up' },
    { key: 'payment_notifications', label: 'Payment Notifications', desc: 'Alert when invoices are paid' },
    { key: 'project_updates', label: 'Project Updates', desc: 'Notifications for project status changes' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>
      <div className="space-y-4">
        {toggleItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-medium">{item.label}</p>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
            <button
              onClick={() => setPrefs({ ...prefs, [item.key]: !prefs[item.key as keyof typeof prefs] })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs[item.key as keyof typeof prefs] ? 'bg-teal-600' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                prefs[item.key as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-green-400 text-sm">Preferences saved</span>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
      >
        <Save className="w-5 h-5" />
        <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
      </button>
    </div>
  );
};

const DataExportTab = () => {
  const [exporting, setExporting] = useState<string | null>(null);

  const exportTable = async (tableName: string, label: string) => {
    setExporting(tableName);

    const { data, error } = await supabase.from(tableName).select('*');
    if (error || !data || data.length === 0) {
      setExporting(null);
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    data.forEach((row) => {
      csvRows.push(headers.map((h) => {
        const val = row[h];
        if (val === null || val === undefined) return '';
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(null);
  };

  const tables = [
    { name: 'clients', label: 'Clients', desc: 'All client records and details' },
    { name: 'projects', label: 'Projects', desc: 'Project data including status and progress' },
    { name: 'invoices', label: 'Invoices', desc: 'Invoice records and payment status' },
    { name: 'products', label: 'Products', desc: 'Product catalog and pricing' },
    { name: 'activity_logs', label: 'Activity Logs', desc: 'System activity and audit trail' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Data Export</h2>
      <p className="text-gray-400">Download your data in CSV format for reporting or backup purposes.</p>

      <div className="space-y-4">
        {tables.map((t) => (
          <div key={t.name} className="p-5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{t.label}</h3>
              <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
            </div>
            <button
              onClick={() => exportTable(t.name, t.label)}
              disabled={exporting === t.name}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{exporting === t.name ? 'Exporting...' : 'Export CSV'}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="p-5 bg-teal-500/10 border border-teal-500/30 rounded-xl">
        <p className="text-teal-400 font-medium">Automatic Backups</p>
        <p className="text-sm text-gray-300 mt-1">Your data is stored securely on Supabase with automatic backups enabled.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
