import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { Login } from '../pages/Login/Login';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { Dashboard } from '../pages/Dashboard/Dashboard';

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
        
        {/* Placeholders for future Phase modules */}
        <Route path="/planning/*" element={<div className="p-8"><h1>Planning Module</h1></div>} />
        <Route path="/execution/*" element={<div className="p-8"><h1>Execution Module</h1></div>} />
        <Route path="/reporting/*" element={<div className="p-8"><h1>Reporting Module</h1></div>} />
        <Route path="/follow-up/*" element={<div className="p-8"><h1>Follow-Up Module</h1></div>} />
        <Route path="/settings" element={<div className="p-8"><h1>Settings</h1></div>} />
      </Route>

      {/* Catch-all redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
