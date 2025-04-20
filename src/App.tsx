import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleLoginSuccess = (userData: any) => {
    login(userData);
  };

  const handleRegisterSuccess = () => {
    // Navigate to login after successful registration
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        user={user} 
        onLogout={logout} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <AuthPage
                isAuthenticated={isAuthenticated}
                onLoginSuccess={handleLoginSuccess}
                onRegisterSuccess={handleRegisterSuccess}
              />
            }
          />
          <Route
            path="/register"
            element={
              <AuthPage
                isAuthenticated={isAuthenticated}
                onLoginSuccess={handleLoginSuccess}
                onRegisterSuccess={handleRegisterSuccess}
              />
            }
          />
          <Route
            path="/todos"
            element={<TodoPage isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;