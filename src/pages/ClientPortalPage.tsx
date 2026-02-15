import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, ArrowRight, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientAuth } from '../contexts/ClientAuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { clientAuth } from '../lib/clientAuth';

type ViewMode = 'login' | 'forgot' | 'forgot-sent';

const ClientPortalPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<ViewMode>('login');
  const [resetEmail, setResetEmail] = useState('');

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
      const adminResponse = await adminLogin(email, password);
      if (adminResponse.success) return;

      const clientResponse = await clientLogin(email, password);
      if (clientResponse.success) return;

      setError('Invalid email or password');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await clientAuth.requestPasswordReset(resetEmail);
      if (result.success) {
        setView('forgot-sent');
      } else {
        setError(result.error || 'Failed to send reset email');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(20, 184, 166, 0.08)' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(6, 182, 212, 0.06)', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 gap-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-teal-900/20 via-cyan-900/15 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaC0ydjJoMnYtMmgydi0yaC0yem0tMiAydi0yaC0ydjJoMnptMiAyaDJ2LTJoLTJ2MnptMC00aDJ2MmgtMnYtMnptMi0ydjJoMnYtMmgtMnptMC0yaDJ2LTJoLTJ2MnptLTYgOHYtMmgtMnYyaDJ6bTIgMHYyaC0ydjJoMnYtMmgydi0yaC0yem0tMiAydi0yaC0ydjJoMnptMiAyaDJ2LTJoLTJ2MnptMC00aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

              <div className="relative z-10">
                <Link to="/" className="inline-flex items-center space-x-3 mb-12 group">
                  <div className="w-14 h-14 relative">
                    <img src="/edited-photo.png" alt="SoleScope AI Owl Logo" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
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
                  {[
                    { title: 'Real-Time Project Updates', desc: 'Track your website, app, or automation project progress live' },
                    { title: 'Performance Analytics', desc: 'View detailed insights and metrics for your digital solutions' },
                    { title: 'Direct Team Access', desc: 'Message our team and get support within your portal' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>Enterprise-grade security with Supabase Authentication</span>
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

              <AnimatePresence mode="wait">
                {view === 'login' && (
                  <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                      <p className="text-gray-400">Access your dashboard</p>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => { setView('forgot'); setError(''); setResetEmail(email); }}
                          className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
                        <Link to="/contact" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
                          Contact us for access
                        </Link>
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <Link to="/faq" className="hover:text-gray-300 transition-colors">Help & FAQs</Link>
                      <span>|</span>
                      <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Support</Link>
                    </div>
                  </motion.div>
                )}

                {view === 'forgot' && (
                  <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button
                      onClick={() => { setView('login'); setError(''); }}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm">Back to sign in</span>
                    </button>

                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                      <p className="text-gray-400">Enter your email and we'll send you a reset link</p>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-6">
                      <div>
                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="reset-email"
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <span>Send Reset Link</span>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {view === 'forgot-sent' && (
                  <motion.div key="forgot-sent" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-teal-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Check Your Email</h2>
                    <p className="text-gray-400 mb-8">
                      If an account exists for <span className="text-white font-medium">{resetEmail}</span>, we've sent a password reset link.
                    </p>
                    <button
                      onClick={() => { setView('login'); setError(''); }}
                      className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all"
                    >
                      Back to Sign In
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
