import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../contexts/ClientAuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const ClientPortalPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { clientUser, login: clientLogin } = useClientAuth();
  const { adminUser, login: adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (clientUser) {
      navigate('/client/dashboard', { replace: true });
    } else if (adminUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [clientUser, adminUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login for:', email);

      const adminResponse = await adminLogin(email, password);

      if (adminResponse.success) {
        console.log('Admin login successful, navigating to dashboard');
        localStorage.setItem('userType', 'admin');
        return;
      }

      console.log('Admin login failed, trying client login');
      const clientResponse = await clientLogin(email, password);

      if (clientResponse.success) {
        console.log('Client login successful, navigating to dashboard');
        return;
      }

      setError('Invalid email or password');
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 gap-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaC0ydjJoMnYtMmgydi0yaC0yem0tMiAydi0yaC0ydjJoMnptMiAyaDJ2LTJoLTJ2MnptMC00aDJ2MmgtMnYtMnptMi0ydjJoMnYtMmgtMnptMC0yaDJ2LTJoLTJ2MnptLTYgOHYtMmgtMnYyaDJ6bTIgMHYyaC0ydjJoMnYtMmgydi0yaC0yem0tMiAydi0yaC0ydjJoMnptMiAyaDJ2LTJoLTJ2MnptMC00aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

              <div className="relative z-10">
                <Link to="/" className="inline-flex items-center space-x-3 mb-12 group">
                  <div className="w-14 h-14 relative">
                    <img
                      src="/edited-photo.png"
                      alt="SoleScope AI Owl Logo"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">SoleScope</span>
                </Link>

                <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Welcome to Your<br />Client Portal
                </h1>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Access your projects, track progress, view analytics, and collaborate with our team all in one secure location.
                </p>

                <div className="space-y-4 mb-12">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Real-Time Project Updates</h3>
                      <p className="text-gray-400 text-sm">Track your website, app, or automation project progress live</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Performance Analytics</h3>
                      <p className="text-gray-400 text-sm">View detailed insights and metrics for your digital solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Direct Team Access</h3>
                      <p className="text-gray-400 text-sm">Message our team and get support within your portal</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span>Enterprise-grade security with 256-bit encryption</span>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <div className="lg:hidden mb-8">
                <Link to="/" className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10">
                    <img src="/edited-photo.png" alt="SoleScope Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xl font-bold text-white">SoleScope</span>
                </Link>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-400">Access your dashboard</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-center text-gray-400 text-sm">
                  New to SoleScope?{' '}
                  <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Contact us for access
                  </button>
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <Link to="/faq" className="hover:text-gray-300 transition-colors">
                  Help & FAQs
                </Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-gray-300 transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
