import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { createOwnerAdmin } from '../utils/createOwnerAdmin';

const SetupAdminPage = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSetup = async () => {
    setStatus('loading');
    setMessage('Creating owner admin account...');

    const result = await createOwnerAdmin();

    if (result.success) {
      setStatus('success');
      setMessage('✅ Admin account created successfully! You can now log in with:\n\nEmail: kevin@solescope.co.uk\nPassword: RoxyRufus3586!');

      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
    } else {
      setStatus('error');
      setMessage(`❌ Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-[700px] h-[700px] rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(147, 51, 234, 0.12)' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(124, 58, 237, 0.08)', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Setup</h1>
          <p className="text-gray-400">Create your owner admin account</p>
        </div>

        {status === 'idle' && (
          <button
            onClick={handleSetup}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Create Owner Account</span>
          </button>
        )}

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 whitespace-pre-line">{message}</p>
                <p className="text-gray-400 text-sm mt-4">Redirecting to login...</p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400">{message}</p>
                <button
                  onClick={handleSetup}
                  className="mt-4 text-sm text-purple-400 hover:text-purple-300 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupAdminPage;
