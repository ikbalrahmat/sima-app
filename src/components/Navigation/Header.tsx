import React from 'react';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
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
        
        <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-lg transition-colors border border-transparent hover:border-slate-200">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-slate-700 leading-none">Super Admin</p>
            <p className="text-xs text-slate-500 mt-1">Administrator</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 ml-1" />
        </button>
      </div>
      
    </header>
  );
};
