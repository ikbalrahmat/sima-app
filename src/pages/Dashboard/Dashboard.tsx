import React from 'react';
import { 
  ClipboardCheck, 
  Map, 
  AlertTriangle, 
  Activity,
  ArrowRight,
  Clock
} from 'lucide-react';
import { StatCard } from '../../components/Dashboard/StatCard';
import { Card } from '../../components/UI/Card';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Executive Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Ringkasan status seluruh siklus audit saat ini.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Tahun Audit:</span>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/20">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Objek Audit (PKAT)"
          value={24}
          icon={<Map size={24} />}
          color="primary"
          trend="12%"
          trendDirection="up"
        />
        <StatCard 
          title="Audit Selesai (LHA)"
          value={8}
          icon={<ClipboardCheck size={24} />}
          color="success"
          trend="2%"
          trendDirection="up"
        />
        <StatCard 
          title="Temuan Terbuka (Open)"
          value={45}
          icon={<AlertTriangle size={24} />}
          color="warning"
          trend="5%"
          trendDirection="down"
        />
        <StatCard 
          title="Tindak Lanjut Lewat Batas"
          value={12}
          icon={<Clock size={24} />}
          color="danger"
          trend="15%"
          trendDirection="up"
        />
      </div>

      {/* Charts & Lists Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Card (Placeholder) */}
        <Card title="Status Pelaksanaan PKAT 2026" className="lg:col-span-2">
          <div className="h-72 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
            <div className="text-center text-slate-400">
              <Activity size={48} className="mx-auto mb-3 opacity-20" />
              <p>Area Visualisasi Grafik Progress <br/> (Menggunakan Recharts/Chart.js)</p>
            </div>
          </div>
        </Card>

        {/* Action List / High Risk Area */}
        <Card 
          title="Temuan Berisiko Tinggi" 
          action={<button className="text-sm text-brand-600 font-medium hover:underline">Lihat Semua</button>}
        >
          <div className="space-y-4">
            {/* Mock Items */}
            {[
              { id: 'TM-001', div: 'Divisi Keuangan', risk: 'Tinggi', days: 14 },
              { id: 'TM-042', div: 'Operasional Gudang', risk: 'Kritis', days: 2 },
              { id: 'TM-018', div: 'IT & Infrastruktur', risk: 'Tinggi', days: 8 },
              { id: 'TM-099', div: 'Pengadaan (Procurement)', risk: 'Tinggi', days: 21 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">{item.id}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${item.risk === 'Kritis' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.risk}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">{item.div}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Jatuh tempo</p>
                    <p className="text-sm font-semibold text-red-600">{item.days} hari</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};
