import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">
      {/* Left Pane - Branding & Info */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 text-white w-1/2 p-16 flex-col justify-center">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck size={48} className="text-blue-400" />
            <h1 className="text-4xl font-bold tracking-tight m-0">SIMA</h1>
          </div>
          <h2 className="text-3xl leading-tight font-semibold mb-6">
            Sistem Informasi Manajemen Audit Terintegrasi
          </h2>
          <p className="text-lg text-slate-300 mb-12 leading-relaxed">
            Platform digital terpusat, transparan, dan akuntabel untuk mengelola seluruh siklus hidup audit internal di dalam organisasi Anda.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-100 text-base">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
              <span>Real-Time Transparency</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100 text-base">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
              <span>Paperless Environment</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100 text-base">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
              <span>Standardised Methodologies</span>
            </div>
          </div>
        </div>
        
        {/* Abstract decorative elements */}
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,rgba(30,58,138,0)_70%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.15)_0%,rgba(30,58,138,0)_70%)] pointer-events-none" />
      </div>

      {/* Right Pane - Form Area */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-[440px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
