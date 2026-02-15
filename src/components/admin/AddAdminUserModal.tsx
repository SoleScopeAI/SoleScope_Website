import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, User, Mail, Key, Copy, Check, AlertCircle, UserCog } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminUserService } from '../../lib/adminUserService';

interface AddAdminUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAdminUserModal: React.FC<AddAdminUserModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminUser, isOwner } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'manager'>('admin');
  const [customPassword, setCustomPassword] = useState('');
  const [useCustomPassword, setUseCustomPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [createdUserName, setCreatedUserName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!adminUser?.id) {
        setError('You must be logged in to create an admin user');
        return;
      }

      if (!isOwner()) {
        setError('Only owners can create admin users');
        return;
      }

      const result = await adminUserService.createAdminUser({
        email: email.trim(),
        fullName: fullName.trim(),
        role,
        createdBy: adminUser.id,
        customPassword: useCustomPassword ? customPassword : undefined,
      });

      if (result.success && result.temporaryPassword) {
        setGeneratedPassword(result.temporaryPassword);
        setCreatedUserName(fullName);
      } else {
        setError(result.error || 'Failed to create admin user');
      }
    } catch (err) {
      console.error('Error creating admin user:', err);
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSuccessClose = () => {
    resetForm();
    onSuccess();
    onClose();
  };

  const resetForm = () => {
    setEmail('');
    setFullName('');
    setRole('admin');
    setCustomPassword('');
    setUseCustomPassword(false);
    setGeneratedPassword(null);
    setPasswordCopied(false);
    setCreatedUserName('');
    setError('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const getRoleDescription = (roleValue: string) => {
    switch (roleValue) {
      case 'owner':
        return 'Full system access, can manage all admin users';
      case 'admin':
        return 'Can manage clients, projects, and invoices';
      case 'manager':
        return 'Can manage clients and view reports';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Add Admin User</h2>
              <p className="text-sm text-gray-400">Create a new admin account for your team</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isOwner() && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Permission Denied</p>
              <p className="text-sm text-red-300 mt-1">
                Only account owners can create admin users. Your current role is: <span className="font-semibold">{adminUser?.role}</span>
              </p>
            </div>
          </div>
        )}

        {generatedPassword ? (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-green-400 font-semibold text-lg mb-1">Admin User Created Successfully!</h3>
                  <p className="text-gray-300 text-sm">
                    <span className="font-medium">{createdUserName}</span> has been added as a <span className="font-medium">{role}</span>.
                  </p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Temporary Password (share securely with the new admin):</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-lg">
                    {generatedPassword}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedPassword)}
                    className="p-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {passwordCopied ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-yellow-400 mt-3">
                  This password will only be shown once. Store it securely and share it with the new admin through a secure channel.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSuccessClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </div>
                </label>
                <input
                  type="text"
                  required
                  disabled={!isOwner()}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </div>
                </label>
                <input
                  type="email"
                  required
                  disabled={!isOwner()}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@solescope.co.uk"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Admin Role</span>
                </div>
              </label>
              <select
                value={role}
                disabled={!isOwner()}
                onChange={(e) => setRole(e.target.value as 'admin' | 'manager')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:bg-gray-900 [&>option]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <p className="text-xs text-gray-400 mt-2">{getRoleDescription(role)}</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>Set Custom Password</span>
                </label>
                <button
                  type="button"
                  disabled={!isOwner()}
                  onClick={() => {
                    setUseCustomPassword(!useCustomPassword);
                    if (useCustomPassword) setCustomPassword('');
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    useCustomPassword ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useCustomPassword ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {useCustomPassword ? (
                <div>
                  <input
                    type="text"
                    disabled={!isOwner()}
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    placeholder="Enter temporary password (min 8 chars)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Password must be at least 8 characters with uppercase, lowercase, number, and symbol
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    A secure temporary password will be auto-generated and shown after creation
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !isOwner()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Create Admin User</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AddAdminUserModal;
