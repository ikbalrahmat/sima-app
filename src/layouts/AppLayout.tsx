import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Navigation/Sidebar';
import { Header } from '../components/Navigation/Header';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Wrapper (Adjusted margin for fixed sidebar) */}
      <div className="flex flex-col flex-1 ml-64 min-w-0 overflow-hidden">
        <Header />
        
        {/* Scrollable Page Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
