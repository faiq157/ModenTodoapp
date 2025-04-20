'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TodoList from '../components/todo/TodoList';

interface TodoPageProps {
  isAuthenticated: boolean;
}

const TodoPage: React.FC<TodoPageProps> = ({ isAuthenticated }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TodoList />
    </div>
  );
};

export default TodoPage;
