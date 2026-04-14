import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  CalendarDays, 
  FileEdit, 
  CheckSquare, 
  ClipboardCheck, 
  BellRing,
  Settings
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuGroups = [
    {
      title: 'Utama',
      items: [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' }
      ]
    },
    {
      title: 'Perencanaan',
      items: [
        { name: 'Audit Universe', icon: <Globe size={20} />, path: '/planning/universe' },
        { name: 'Risk Assessment', icon: <ShieldAlert size={20} />, path: '/planning/risk' },
        { name: 'PKAT', icon: <CalendarDays size={20} />, path: '/planning/pkat' },
      ]
    },
    {
      title: 'Pelaksanaan',
      items: [
        { name: 'Surat Tugas', icon: <FileEdit size={20} />, path: '/execution/assignment' },
        { name: 'Kertas Kerja (KKA)', icon: <CheckSquare size={20} />, path: '/execution/kka' },
      ]
    },
    {
      title: 'Pelaporan & Tindak Lanjut',
      items: [
        { name: 'LHA & Tanggapan', icon: <ClipboardCheck size={20} />, path: '/reporting/lha' },
        { name: 'Monitoring (Follow-up)', icon: <BellRing size={20} />, path: '/follow-up/monitoring' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-brand-900 text-slate-300 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto border-r border-brand-800 shadow-2xl z-20">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-6 bg-brand-950/50 border-b border-brand-800">
        <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
          <ShieldAlert size={20} />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">SIMA</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <h4 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3 px-2">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-brand-800 text-white font-medium shadow-inner'
                          : 'hover:bg-brand-800/50 hover:text-white'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Settings Menu */}
      <div className="px-4 py-4 border-t border-brand-800 bg-brand-950/30">
        <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-brand-800 text-white font-medium shadow-inner'
                  : 'hover:bg-brand-800/50 hover:text-white'
              }`
            }
          >
            <Settings size={20} />
            <span className="text-sm">Pengaturan</span>
        </NavLink>
      </div>
    </aside>
  );
};
