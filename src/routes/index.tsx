import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { Login } from '../pages/Login/Login';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Kriteria } from '../pages/Planning/Kriteria/Kriteria';
import { STO } from '../pages/Planning/STO/STO';
import { UserManagement } from '../pages/Users/UserManagement';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Main Internal Application Routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Planning Module */}
        <Route path="/planning/kriteria" element={<Kriteria />} />
        <Route path="/planning/sto" element={<STO />} />
        <Route path="/planning/*" element={<div className="p-8"><h1>Planning Module Placeholder</h1></div>} />
        <Route path="/execution/*" element={<div className="p-8"><h1>Execution Module</h1></div>} />
        <Route path="/reporting/*" element={<div className="p-8"><h1>Reporting Module</h1></div>} />
        <Route path="/follow-up/*" element={<div className="p-8"><h1>Follow-Up Module</h1></div>} />
        
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<div className="p-8"><h1>Settings</h1></div>} />
      </Route>

      {/* Catch-all redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
