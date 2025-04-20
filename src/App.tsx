import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import { useRouter } from 'next/router';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const handleLoginSuccess = (userData: any) => {
    router.push('/todos');  // Redirect to the Todos page after login success
  };

  const handleRegisterSuccess = () => {
    router.push('/login');  // Redirect to the login page after successful registration
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
        {/* Render pages based on routes */}
        {router.pathname === '/' && <HomePage />}
        {router.pathname === '/login' && (
          <AuthPage
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
        {router.pathname === '/register' && (
          <AuthPage
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
        {router.pathname === '/todos' && <TodoPage isAuthenticated={isAuthenticated} />}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
