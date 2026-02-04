import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>React Hooks Workshop</h1>
      <p className="subtitle">A 60-minute journey through React Hooks - from basics to engineering practices</p>

      <section className="demo-section">
        <h2>📚 Part 1: Basic Hooks (20 min)</h2>
        <div className="demo-list">
          <Link to="/use-state" className="demo-link">
            <h3>useState</h3>
            <p>Counter + Form Input - Learn state management basics</p>
          </Link>
          <Link to="/use-effect" className="demo-link">
            <h3>useEffect</h3>
            <p>Side effects, cleanup, and StrictMode behavior</p>
          </Link>
          <Link to="/use-ref" className="demo-link">
            <h3>useRef</h3>
            <p>DOM manipulation and persisting values between renders</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>⚡ Part 2: Performance Optimization (15 min)</h2>
        <div className="demo-list">
          <Link to="/use-memo-callback" className="demo-link">
            <h3>useMemo & useCallback</h3>
            <p>Optimize expensive computations and prevent unnecessary re-renders</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>🔧 Part 3: Advanced Hooks (15 min)</h2>
        <div className="demo-list">
          <Link to="/use-reducer" className="demo-link">
            <h3>useReducer</h3>
            <p>Todo app with complex state logic</p>
          </Link>
          <Link to="/use-context" className="demo-link">
            <h3>useContext</h3>
            <p>Theme switching and context optimization patterns</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>🚀 Part 4: Custom Hooks & Real-World Patterns (10 min)</h2>
        <div className="demo-list">
          <Link to="/use-debounce" className="demo-link">
            <h3>useDebounce</h3>
            <p>Search with debouncing for better UX</p>
          </Link>
          <Link to="/use-local-storage" className="demo-link">
            <h3>useLocalStorage</h3>
            <p>Persist state across sessions</p>
          </Link>
          <Link to="/use-event-listener" className="demo-link">
            <h3>useEventListener</h3>
            <p>Keyboard shortcuts and event handling</p>
          </Link>
          <Link to="/tanstack-query" className="demo-link">
            <h3>TanStack Query</h3>
            <p>Data fetching with caching, loading states, and error handling</p>
          </Link>
        </div>
      </section>

      <footer className="workshop-footer">
        <p>💡 <strong>Tip:</strong> Check out the <Link to="/cookbook">Cookbook</Link> for quick reference recipes!</p>
      </footer>
    </div>
  );
}
