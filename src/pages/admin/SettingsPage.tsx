import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Palette, Database, Key, Users, Plus, Crown, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminUserService, AdminUserListItem } from '../../lib/adminUserService';
import AddAdminUserModal from '../../components/admin/AddAdminUserModal';

const SettingsPage = () => {
  const { adminUser, isOwner } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [adminUsers, setAdminUsers] = useState<AdminUserListItem[]>([]);
  const [loadingAdminUsers, setLoadingAdminUsers] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Key },
    { id: 'data', label: 'Data & Backup', icon: Database },
  ];

  useEffect(() => {
    if (activeTab === 'team') {
      fetchAdminUsers();
    }
  }, [activeTab]);

  const fetchAdminUsers = async () => {
    setLoadingAdminUsers(true);
    try {
      const users = await adminUserService.getAllAdminUsers();
      setAdminUsers(users);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    } finally {
      setLoadingAdminUsers(false);
    }
  };

  const handleAdminUserCreated = () => {
    fetchAdminUsers();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'admin':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'manager':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

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
                      ? 'bg-gradient-to-r from-purple-600/20 to-violet-600/20 text-white border border-purple-500/30'
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
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Profile Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={adminUser?.full_name}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={adminUser?.email}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <input
                      type="text"
                      value={adminUser?.role}
                      disabled
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Team Management</h2>
                    <p className="text-gray-400 mt-1">Manage admin users and their permissions</p>
                  </div>
                  {isOwner() ? (
                    <button
                      onClick={() => setShowAddAdminModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Admin User</span>
                    </button>
                  ) : (
                    <div className="relative group">
                      <button
                        disabled
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600/50 text-gray-400 font-semibold rounded-xl cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Admin User</span>
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-black/90 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <p className="text-xs text-gray-300">Only owners can create admin users</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isOwner() && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium">View-Only Access</p>
                      <p className="text-sm text-blue-300 mt-1">
                        Your current role is <span className="font-semibold">{adminUser?.role}</span>. Only owners can add or modify admin users.
                      </p>
                    </div>
                  </div>
                )}

                {loadingAdminUsers ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading admin users...</p>
                  </div>
                ) : adminUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No admin users found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {adminUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              user.role === 'owner'
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                : user.role === 'admin'
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}>
                              {user.role === 'owner' ? (
                                <Crown className="w-6 h-6 text-white" />
                              ) : (
                                <User className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-white font-semibold">{user.full_name}</h3>
                                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                                  {user.role}
                                </span>
                                {!user.is_active && (
                                  <span className="px-3 py-1 rounded-lg text-xs font-medium border bg-red-500/20 text-red-400 border-red-500/30">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Last login: {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                              </p>
                            </div>
                          </div>
                          {user.id === adminUser?.id && (
                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-lg border border-green-500/30">
                              You
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive email updates for important events</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">New Client Alerts</p>
                      <p className="text-sm text-gray-400">Get notified when new clients sign up</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Payment Notifications</p>
                      <p className="text-sm text-gray-400">Alert when invoices are paid</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Security Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Appearance</h2>
                <p className="text-gray-400">Customize the look and feel of your admin panel</p>

                <div className="p-6 bg-white/5 rounded-xl">
                  <p className="text-white">Theme customization options coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Integrations</h2>

                <div className="space-y-4">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Stripe</h3>
                        <p className="text-sm text-gray-400">Payment processing and invoicing</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all">
                        Connect
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Email Service</h3>
                        <p className="text-sm text-gray-400">Automated email notifications</p>
                      </div>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Data & Backup</h2>

                <div className="space-y-4">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Export Data</h3>
                    <p className="text-sm text-gray-400 mb-4">Download a copy of your data in CSV format</p>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all">
                      Export All Data
                    </button>
                  </div>

                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Automatic Backups</h3>
                    <p className="text-sm text-gray-400 mb-4">Your data is automatically backed up daily</p>
                    <p className="text-sm text-green-400">Last backup: Today at 3:00 AM</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddAdminUserModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onSuccess={handleAdminUserCreated}
      />
    </div>
  );
};

export default SettingsPage;
