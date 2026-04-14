import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); 
    }, 1500);
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
          required
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} />}
          required
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

      <div className="mt-8 text-center text-sm text-slate-500 pt-6 border-t border-slate-200">
        <p>
          Internal systems only. Don't have an account?{' '}
          <span className="text-brand-900 font-medium">Contact your Administrator.</span>
        </p>
      </div>
    </div>
  );
};
