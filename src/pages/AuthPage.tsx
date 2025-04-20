'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { CheckSquare } from 'lucide-react';

interface AuthPageProps {
  isAuthenticated: boolean;
  onLoginSuccess: (userData: any) => void;
  onRegisterSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  isAuthenticated,
  onLoginSuccess,
  onRegisterSuccess,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/todos');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <CheckSquare className="h-12 w-12 text-primary" aria-hidden="true" />
        </div>
        <h2 className="mt-2 text-3xl font-bold text-foreground">TaskMaster</h2>
        <p className="mt-2 text-sm text-muted">
          The elegant productivity app for your daily tasks
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {isLoginPage ? (
          <LoginForm onLoginSuccess={onLoginSuccess} />
        ) : (
          <RegisterForm onRegisterSuccess={onRegisterSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
