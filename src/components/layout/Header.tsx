'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckSquare, LogOut, Moon, Sun, User } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  user: any | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push('/auth/signin');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-foreground font-semibold text-lg">
              <CheckSquare className="h-6 w-6 text-primary mr-2" />
              <span>TaskMaster</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Conditional rendering based on user authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase() || <User size={16} />}
                  </span>
                  <span className="hidden md:inline">{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                {/* Only show Sign In and Sign Up buttons if the user is not logged in */}
                <Button variant="outline" size="sm" onClick={() => router.push('/auth/signin')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => router.push('/auth/signup')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
