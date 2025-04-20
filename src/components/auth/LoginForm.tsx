import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LockKeyhole, Mail } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (userData: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      if (email && password) {
        const userData = { email, id: '1', name: 'User' };
        localStorage.setItem('authUser', JSON.stringify(userData));
        onLoginSuccess(userData);
        navigate('/todos');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="card max-w-md w-full mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted mt-1">Sign in to your account</p>
      </div>
      
      {error && (
        <div className="bg-error/10 text-error text-sm p-3 rounded-md mb-4 animate-slide-in">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail size={18} className="absolute left-3 top-3 text-muted" />
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
            autoFocus
          />
        </div>
        
        <div className="relative">
          <LockKeyhole size={18} className="absolute left-3 top-3 text-muted" />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-primary hover:underline">Forgot password?</a>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Sign In
        </Button>
        
        <p className="text-center text-sm text-muted mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;