import React from 'react';
import { Bell, Search, Menu, ChevronDown, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Left side: Search & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center relative">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari data audit, no KKA..." 
            className="pl-10 pr-4 py-2 w-64 md:w-80 rounded-lg bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        
        <div className="flex items-center gap-3 relative group">
          <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm uppercase">
              {user?.name?.substring(0, 2) || 'AD'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-700 leading-none">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-brand-600 font-medium mt-1">{user?.role || 'System Role'}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400 ml-1" />
          </button>

          {/* Simple Dropdown for Logout */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg font-medium"
            >
              <LogOut size={16} /> Keluar Aplikasi
            </button>
          </div>
        </div>
      </div>
      
    </header>
  );
};
