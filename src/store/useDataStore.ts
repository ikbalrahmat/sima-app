import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from './useAuthStore';

// Kriteria Data Types
export interface KriteriaItem {
  kriteria: string;
  nilai: number;
}

export interface FaktorRisiko {
  id: string;
  faktor: string;
  items: KriteriaItem[];
}

interface DataState {
  users: User[];
  faktorRisiko: FaktorRisiko[];
  stoImage: string | null;
  
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
  
  setStoImage: (base64: string | null) => void;
  
  addFaktorRisiko: (faktor: string) => void;
  updateFaktorRisiko: (id: string, newFaktor: string) => void;
  addKriteriaToFaktor: (faktorId: string, item: KriteriaItem) => void;
  deleteFaktorRisiko: (id: string) => void;
}

const initialStoImage = null;

// Initial Mock Faktor Risiko Data
const initialFaktorRisiko: FaktorRisiko[] = [
  {
    id: 'f-1',
    faktor: 'Anggaran yang dikelola',
    items: [
      { kriteria: '≤ 1 Milyar', nilai: 1 },
      { kriteria: '> 1 Milyar - 3 Milyar', nilai: 2 },
      { kriteria: '> 3 Milyar - 5 Milyar', nilai: 3 },
      { kriteria: '> 5 Milyar - 7 Milyar', nilai: 4 },
      { kriteria: '> 7 Milyar', nilai: 5 },
    ]
  },
  {
    id: 'f-2',
    faktor: 'Pelaksanaan audit sebelumnya',
    items: [
      { kriteria: '≤ 1 tahun yang lalu', nilai: 1 },
      { kriteria: '> 1 - 2 tahun yang lalu', nilai: 2 },
      { kriteria: '> 2 - 3 tahun yang lalu', nilai: 3 },
      { kriteria: '> 3 - 4 tahun yang lalu', nilai: 4 },
      { kriteria: '> 4 tahun yang lalu', nilai: 5 },
    ]
  },
  {
    id: 'f-3',
    faktor: 'Nilai Risiko',
    items: [
      { kriteria: 'Low', nilai: 1 },
      { kriteria: 'Medium Low', nilai: 2 },
      { kriteria: 'Medium', nilai: 3 },
      { kriteria: 'Medium High', nilai: 4 },
      { kriteria: 'High', nilai: 5 },
    ]
  }
];

const initialUsers: User[] = [
  { id: 'u-1', name: 'John SuperAdmin', email: 'super@sima.co.id', role: 'Super Admin', division: 'IT/System' },
  { id: 'u-2', name: 'Alfi Admin', email: 'alfi@sima.co.id', role: 'Admin', division: 'Operasional' },
  { id: 'u-3', name: 'Budi Auditor', email: 'budi@sima.co.id', role: 'Auditor', division: 'SPI' },
  { id: 'u-4', name: 'Chika Auditee', email: 'chika@sima.co.id', role: 'Auditee', division: 'Keuangan' },
];

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      users: initialUsers,
      faktorRisiko: initialFaktorRisiko,
      stoImage: initialStoImage,
      
      addUser: (userData) => set((state) => ({
        users: [...state.users, { ...userData, id: `u-${Date.now()}` }]
      })),
      
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      })),
      
      setStoImage: (base64) => set({ stoImage: base64 }),

      addFaktorRisiko: (faktor) => set((state) => ({
        faktorRisiko: [...state.faktorRisiko, { id: `f-${Date.now()}`, faktor, items: [] }]
      })),

      updateFaktorRisiko: (id, newFaktor) => set((state) => ({
        faktorRisiko: state.faktorRisiko.map(f => 
          f.id === id ? { ...f, faktor: newFaktor } : f
        )
      })),

      addKriteriaToFaktor: (faktorId, item) => set((state) => ({
        faktorRisiko: state.faktorRisiko.map(f => {
          if (f.id === faktorId) {
            return { ...f, items: [...f.items, item] };
          }
          return f;
        })
      })),

      deleteFaktorRisiko: (id) => set((state) => ({
        faktorRisiko: state.faktorRisiko.filter(f => f.id !== id)
      }))
    }),
    {
      name: 'sima-data-storage', // key in localStorage
    }
  )
);
