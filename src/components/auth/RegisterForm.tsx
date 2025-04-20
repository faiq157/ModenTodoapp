import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LockKeyhole, Mail, User } from 'lucide-react';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      if (name && email && password) {
        onRegisterSuccess();
        navigate('/login');
      } else {
        setError('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="card max-w-md w-full mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
        <p className="text-muted mt-1">Sign up to get started</p>
      </div>
      
      {error && (
        <div className="bg-error/10 text-error text-sm p-3 rounded-md mb-4 animate-slide-in">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User size={18} className="absolute left-3 top-3 text-muted" />
          <Input
            id="name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10"
            required
            autoFocus
          />
        </div>
        
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
        
        <div className="relative">
          <LockKeyhole size={18} className="absolute left-3 top-3 text-muted" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Sign Up
        </Button>
        
        <p className="text-center text-sm text-muted mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;