import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import UseStatePage from './pages/UseStatePage';
import UseEffectPage from './pages/UseEffectPage';
import UseRefPage from './pages/UseRefPage';
import UseMemoCallbackPage from './pages/UseMemoCallbackPage';
import UseReducerPage from './pages/UseReducerPage';
import UseContextPage from './pages/UseContextPage';
import UseDebouncePage from './pages/UseDebouncePage';
import UseLocalStoragePage from './pages/UseLocalStoragePage';
import UseEventListenerPage from './pages/UseEventListenerPage';
import TanStackQueryPage from './pages/TanStackQueryPage';

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>⚛️ React Hooks Workshop</h1>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/use-state" element={<UseStatePage />} />
          <Route path="/use-effect" element={<UseEffectPage />} />
          <Route path="/use-ref" element={<UseRefPage />} />
          <Route path="/use-memo-callback" element={<UseMemoCallbackPage />} />
          <Route path="/use-reducer" element={<UseReducerPage />} />
          <Route path="/use-context" element={<UseContextPage />} />
          <Route path="/use-debounce" element={<UseDebouncePage />} />
          <Route path="/use-local-storage" element={<UseLocalStoragePage />} />
          <Route path="/use-event-listener" element={<UseEventListenerPage />} />
          <Route path="/tanstack-query" element={<TanStackQueryPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
