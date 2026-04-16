import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  Briefcase,
  FileEdit, 
  CheckSquare, 
  ClipboardCheck, 
  BellRing,
  Settings,
  SlidersHorizontal,
  Building2,
  History,
  Calendar,
  CalendarRange,
  FileText,
  Files,
  Calculator,
  BriefcaseBusiness,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const isAdminOrSuperAdmin = user?.role === 'Super Admin' || user?.role === 'Admin';
  
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
        { name: 'Kriteria', icon: <SlidersHorizontal size={20} />, path: '/planning/kriteria' },
        { name: 'STO', icon: <Building2 size={20} />, path: '/planning/sto' },
        { name: 'Audit Terakhir Dept', icon: <History size={20} />, path: '/planning/last-audit' },
        { name: 'Risk Corporate Dept', icon: <ShieldAlert size={20} />, path: '/planning/risk-corporate' },
        { name: 'Audit Universe Dept', icon: <Globe size={20} />, path: '/planning/audit-universe' },
        { name: 'Kalender', icon: <Calendar size={20} />, path: '/planning/calendar' },
        { name: 'Rekap Kalender', icon: <CalendarRange size={20} />, path: '/planning/calendar-recap' },
        { name: 'Agenda Form 1', icon: <FileText size={20} />, path: '/planning/agenda-form-1' },
        { name: 'Agenda Form 2', icon: <Files size={20} />, path: '/planning/agenda-form-2' },
        { name: 'Perhitungan Hari', icon: <Calculator size={20} />, path: '/planning/day-calculation' },
        { name: 'PKAT', icon: <Briefcase size={20} />, path: '/planning/pkat' },
        { name: 'PKNAT', icon: <BriefcaseBusiness size={20} />, path: '/planning/pknat' },
        { name: 'Laporan', icon: <BarChart3 size={20} />, path: '/planning/report' },
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
        {menuGroups.map((group, idx) => {
          // Simplifikasi: Auditee tidak butuh menu Planning lengkap dalam dunia nyata,
          // tapi untuk prototipe ini kita tampilkan semua, atau filter jika di-define.
          return (
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
          );
        })}
      </nav>

      {/* Footer / Settings Menu */}
      <div className="px-4 py-4 border-t border-brand-800 bg-brand-950/30 flex flex-col gap-1">
        {isAdminOrSuperAdmin && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-brand-800 text-white font-medium shadow-inner'
                  : 'hover:bg-brand-800/50 hover:text-white'
              }`
            }
          >
            <Users size={20} />
            <span className="text-sm">Manajemen User</span>
          </NavLink>
        )}
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
