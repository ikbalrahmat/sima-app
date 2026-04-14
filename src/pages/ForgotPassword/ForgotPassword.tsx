import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 w-full text-center">
        <div className="w-16 h-16 bg-brand-50 rounded-full flex justify-center items-center mx-auto mb-6">
          <Send size={32} className="text-brand-600" />
        </div>
        <h2 className="text-3xl text-brand-900 font-bold mb-2">Check your email</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We've sent a password reset link to <strong className="text-slate-900">{email}</strong>.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 w-full text-center">
      <div className="mb-8">
        <h2 className="text-3xl text-brand-900 font-bold mb-2">Reset Password</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Enter your registered email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleReset} className="flex flex-col gap-6 text-left">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@sima.co.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required
        />

        <Button 
          type="submit" 
          fullWidth 
          variant="primary" 
          isLoading={isLoading}
          className="mt-2"
        >
          Send Reset Link
        </Button>
      </form>

      <div className="mt-8 flex justify-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
