import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Plus, Users, Trash2, Mail, Building } from 'lucide-react';
import { useDataStore } from '../../store/useDataStore';
import { useAuthStore, type Role } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const { users, addUser, deleteUser } = useDataStore();

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role | ''>('');
  const [newDivision, setNewDivision] = useState('');

  // 1. RBAC Check at page level (Only Admin & Super Admin allowed)
  if (currentUser?.role !== 'Super Admin' && currentUser?.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // 2. Logic: Who can create what
  
  const getAvailableRoles = (): Role[] => {
    if (currentUser.role === 'Super Admin') return ['Admin'];
    // Jika Admin, dia bisa bikin ini:
    return ['Auditor', 'Auditee', 'Direksi'];
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newEmail && newRole && newDivision) {
      addUser({ 
        name: newName, 
        email: newEmail, 
        role: newRole as Role, 
        division: newDivision 
      });
      setIsAddingUser(false);
      setNewName(''); setNewEmail(''); setNewRole(''); setNewDivision('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-brand-600" /> Manajemen Pengguna
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {currentUser.role === 'Super Admin' 
              ? 'Anda adalah Super Admin. Anda hanya dapat mendaftarkan akun Admin.'
              : 'Anda adalah Admin. Anda dapat mendaftarkan Auditor, Auditee, dan Direksi.'}
          </p>
        </div>
        {!isAddingUser && (
          <Button icon={<Plus size={18} />} onClick={() => setIsAddingUser(true)}>
            Tambah Pengguna
          </Button>
        )}
      </div>

      {isAddingUser && (
        <Card className="border-brand-200 bg-brand-50/50">
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label>
              <input required value={newName} onChange={e => setNewName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ahmad Roy..." />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input required value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-brand-500" placeholder="ahmad@sima.co.id" />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Role Akun</label>
              <select required value={newRole} onChange={e => setNewRole(e.target.value as Role)} className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="">-- Pilih Role --</option>
                {getAvailableRoles().map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Divisi / Dept</label>
              <input required value={newDivision} onChange={e => setNewDivision(e.target.value)} type="text" className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-brand-500" placeholder="IT, SPI, dll" />
            </div>
            <div className="lg:col-span-1 flex gap-2">
              <Button type="submit" className="flex-1">Simpan</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddingUser(false)}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4">Nama Pengguna</th>
                <th scope="col" className="px-6 py-4">Informasi Kontak</th>
                <th scope="col" className="px-6 py-4">Hak Akses (Role)</th>
                <th scope="col" className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {u.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-slate-600"><Mail size={14}/> {u.email}</span>
                      <span className="flex items-center gap-2 text-slate-500 text-xs"><Building size={14}/> {u.division}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                      ${u.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 
                        u.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                        u.role === 'Auditor' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}
                    `}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {/* Can only delete if not yourself and not a Super Admin (unless you're super admin deleting admin) */}
                    {u.id !== currentUser.id && u.role !== 'Super Admin' && (
                      <button 
                        onClick={() => deleteUser(u.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Hapus Pengguna"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada pengguna terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
};
