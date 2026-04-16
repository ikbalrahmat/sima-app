import React, { useState } from 'react';
import { Card } from '../../../components/UI/Card';
import { Button } from '../../../components/UI/Button';
import { Plus, SlidersHorizontal, Trash2, Edit2, Check, X } from 'lucide-react';
import { useDataStore } from '../../../store/useDataStore';

// Helper warna badge nilai dari 1-5
const getValueBadgeColor = (nilai: number) => {
  switch(nilai) {
    case 1: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 2: return 'bg-lime-100 text-lime-800 border-lime-200';
    case 3: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 4: return 'bg-orange-100 text-orange-800 border-orange-200';
    case 5: return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

export const Kriteria: React.FC = () => {
  const { faktorRisiko, addFaktorRisiko, updateFaktorRisiko, addKriteriaToFaktor, deleteFaktorRisiko } = useDataStore();
  
  const [isAddingFaktor, setIsAddingFaktor] = useState(false);
  const [newFaktorName, setNewFaktorName] = useState('');

  const [editingFaktorId, setEditingFaktorId] = useState<string | null>(null);
  const [editFaktorName, setEditFaktorName] = useState('');

  const [addingKriteriaFor, setAddingKriteriaFor] = useState<string | null>(null);
  const [newKriteriaName, setNewKriteriaName] = useState('');
  const [newKriteriaValue, setNewKriteriaValue] = useState<number>(1);

  const handleCreateFaktor = () => {
    if (newFaktorName.trim()) {
      addFaktorRisiko(newFaktorName.trim());
      setNewFaktorName('');
      setIsAddingFaktor(false);
    }
  };

  const handleCreateKriteria = (faktorId: string) => {
    if (newKriteriaName.trim()) {
      addKriteriaToFaktor(faktorId, { kriteria: newKriteriaName.trim(), nilai: newKriteriaValue });
      setNewKriteriaName('');
      setNewKriteriaValue(1);
      setAddingKriteriaFor(null);
    }
  };

  const startEditFaktor = (id: string, currentName: string) => {
    setEditingFaktorId(id);
    setEditFaktorName(currentName);
  };

  const handleSaveEditFaktor = (id: string) => {
    if (editFaktorName.trim()) {
      updateFaktorRisiko(id, editFaktorName.trim());
      setEditingFaktorId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="text-brand-600" />
            Kriteria Pengukuran Faktor Risiko
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manajemen parameter penilaian dan bobot untuk setiap faktor risiko audit.
          </p>
        </div>
        {!isAddingFaktor && (
          <Button icon={<Plus size={18} />} onClick={() => setIsAddingFaktor(true)}>
            Tambah Faktor Risiko
          </Button>
        )}
      </div>

      {isAddingFaktor && (
        <Card className="border-brand-200 bg-brand-50/30">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Nama Faktor Risiko Baru</label>
              <input 
                type="text" 
                autoFocus
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Contoh: Kompleksitas Transaksi"
                value={newFaktorName}
                onChange={(e) => setNewFaktorName(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateFaktor}>Simpan</Button>
            <Button variant="outline" onClick={() => setIsAddingFaktor(false)}>Batal</Button>
          </div>
        </Card>
      )}

      {/* Grid of Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {faktorRisiko.map((faktorObj) => (
          <Card 
            key={faktorObj.id} 
            title={
              editingFaktorId === faktorObj.id ? (
                <input
                  type="text"
                  autoFocus
                  className="w-full text-lg font-semibold px-2 py-1 -ml-2 border border-brand-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={editFaktorName}
                  onChange={(e) => setEditFaktorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEditFaktor(faktorObj.id);
                    if (e.key === 'Escape') setEditingFaktorId(null);
                  }}
                />
              ) : (
                faktorObj.faktor
              )
            } 
            noPadding 
            className="flex flex-col h-full hover:shadow-md transition-shadow"
            action={
              <div className="flex gap-1">
                {editingFaktorId === faktorObj.id ? (
                  <>
                    <button 
                      onClick={() => handleSaveEditFaktor(faktorObj.id)}
                      className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-md transition-colors"
                      title="Simpan"
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setEditingFaktorId(null)}
                      className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-md transition-colors"
                      title="Batal"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => startEditFaktor(faktorObj.id, faktorObj.faktor)}
                      className="text-slate-400 hover:text-brand-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      title="Edit Nama Faktor"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteFaktorRisiko(faktorObj.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      title="Hapus Faktor Risiko"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            }
          >
            {/* Table inside the Card */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Kriteria parameter</th>
                    <th scope="col" className="px-5 py-3 font-semibold text-center w-24">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {faktorObj.items.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className="bg-white border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-5 py-3 text-slate-700 font-medium whitespace-nowrap">
                        {item.kriteria}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border font-bold text-xs shadow-sm ${getValueBadgeColor(item.nilai)}`}>
                          {item.nilai}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* Inline Form Add Kriteria */}
                  {addingKriteriaFor === faktorObj.id && (
                    <tr className="bg-slate-50">
                      <td className="px-3 py-2">
                        <input 
                          type="text" 
                          autoFocus
                          placeholder="Kriteria baru..."
                          className="w-full px-2 py-1 text-sm border rounded outline-none focus:border-brand-500"
                          value={newKriteriaName}
                          onChange={(e) => setNewKriteriaName(e.target.value)}
                        />
                      </td>
                      <td className="px-3 py-2 text-center flex items-center gap-2">
                        <select 
                          className="w-16 px-1 py-1 text-sm border rounded outline-none"
                          value={newKriteriaValue}
                          onChange={(e) => setNewKriteriaValue(Number(e.target.value))}
                        >
                          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {addingKriteriaFor === faktorObj.id && (
                <div className="px-3 py-2 bg-slate-50 flex gap-2 justify-end border-t border-slate-100">
                  <button onClick={() => setAddingKriteriaFor(null)} className="text-xs px-2 py-1 text-slate-500 hover:bg-slate-200 rounded">Batal</button>
                  <button onClick={() => handleCreateKriteria(faktorObj.id)} className="text-xs px-2 py-1 bg-brand-600 text-white rounded">Simpan</button>
                </div>
              )}
            </div>
            
            {addingKriteriaFor !== faktorObj.id && (
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-center mt-auto">
                <button 
                  onClick={() => setAddingKriteriaFor(faktorObj.id)}
                  className="text-sm font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
                >
                  <Plus size={14} /> Tambah Kriteria
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>

    </div>
  );
};
