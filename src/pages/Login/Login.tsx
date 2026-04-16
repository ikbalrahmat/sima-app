import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Users } from 'lucide-react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { users } = useDataStore();

  const handleLogin = (e?: React.FormEvent, mockEmail?: string) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // Find user from mock store
      const targetEmail = mockEmail || email;
      const user = users.find(u => u.email === targetEmail);
      
      if (user) {
        login(user);
        navigate('/dashboard');
      } else {
        alert("User not found!");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl text-brand-900 font-bold mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm">Please sign in to access the auditing portal.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@sima.co.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required={!email}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} />}
          required={!email}
        />

        <div className="flex justify-end -mt-1 mb-4">
          <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          variant="primary" 
          isLoading={isLoading}
          icon={!isLoading && <LogIn size={18} />}
          className="mt-4"
        >
          Sign In
        </Button>
      </form>

      {/* Development / Testing Panel */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-4 justify-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <Users size={14} /> <span>Quick Login (Testing Only)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => handleLogin(undefined, u.email)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded transition-colors text-center font-medium"
            >
              {u.role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
