// ClientSessionProvider.tsx
'use client';  // This ensures it's treated as a client component

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';

interface ClientSessionProviderProps {
  children: React.ReactNode;
}

const ClientSessionProvider: React.FC<ClientSessionProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    // Handle logout logic using next-auth's signOut
    await signOut({ callbackUrl: '/auth/signin' });
  };

  // Render the session data and pass it to the Header as props
  return (
    <>
      <Header
        user={session?.user || null}  // Pass session data to Header
        onLogout={handleLogout}  // Pass logout function to Header
        isDarkMode={false}  // Add dark mode logic here
        toggleDarkMode={() => {}}  // Dark mode toggle logic here
      />
      {children}
    </>
  );
};

export default ClientSessionProvider;
