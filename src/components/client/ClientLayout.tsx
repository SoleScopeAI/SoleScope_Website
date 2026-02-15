import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  FileArchive,
  LogOut,
  User,
  Menu,
  X,
  Building2
} from 'lucide-react';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { clientUser, logout } = useClientAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/client-portal');
  };

  const navigationItems = [
    { path: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/client/projects', label: 'Projects', icon: FolderKanban },
    { path: '/client/invoices', label: 'Invoices', icon: FileText },
    { path: '/client/messages', label: 'Messages', icon: MessageSquare },
    { path: '/client/documents', label: 'Documents', icon: FileArchive },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-72 bg-black/40 backdrop-blur-xl border-r border-white/10
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10">
                  <img
                    src="/edited-photo.png"
                    alt="SoleScope Logo"
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-xl font-bold text-white">SoleScope</span>
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="mb-6 p-4 bg-gradient-to-br from-teal-900/30 to-teal-800/20 rounded-xl border border-teal-500/20">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-teal-600/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {clientUser?.client_data?.company_name || 'Company'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{clientUser?.full_name}</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-600/20 to-cyan-600/20 text-white border border-teal-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-white/10">
              <Link
                to="/client/profile"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 mb-2"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">{clientUser?.full_name}</p>
                  <p className="text-xs text-gray-400">{clientUser?.email}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
