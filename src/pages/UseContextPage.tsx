import { useTheme } from '../context/ThemeContext';

export default function UseContextPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="demo-page">
      <h1>useContext Demo</h1>
      <p className="description">
        useContext provides a way to pass data through the component tree without having to pass props manually at every level.
      </p>

      <section className="demo-box">
        <h2>Theme Switcher</h2>
        <div className="demo-content">
          <div className={`theme-preview ${theme}`}>
            <p>Current theme: <strong>{theme}</strong></p>
            <button onClick={toggleTheme}>
              Toggle to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
          </div>
          <p className="tip">💡 This theme is persisted in localStorage and shared across the entire app!</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>How It Works</h2>
        <div className="demo-content">
          <div className="code-example">
            <h3>1. Create Context</h3>
            <pre>{`const ThemeContext = createContext();`}</pre>

            <h3>2. Provide Context</h3>
            <pre>{`<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>`}</pre>

            <h3>3. Consume Context</h3>
            <pre>{`const { theme, toggleTheme } = useContext(ThemeContext);`}</pre>
          </div>
        </div>
      </section>

      <section className="demo-box">
        <h2>Optimization Tips</h2>
        <div className="demo-content">
          <div className="tips-list">
            <div className="tip-item">
              <h4>✅ Memoize Context Value</h4>
              <p>Use useMemo to prevent unnecessary re-renders when context value changes</p>
              <pre>{`const value = useMemo(() => ({ theme, toggleTheme }), [theme]);`}</pre>
            </div>
            <div className="tip-item">
              <h4>✅ Split Contexts</h4>
              <p>Split frequently changing values into separate contexts</p>
              <pre>{`<ThemeContext.Provider>
  <UserContext.Provider>
    {children}
  </UserContext.Provider>
</ThemeContext.Provider>`}</pre>
            </div>
            <div className="tip-item">
              <h4>✅ Custom Hook</h4>
              <p>Create a custom hook to enforce usage within provider</p>
              <pre>{`function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('...');
  return context;
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Purpose:</strong> Share data across component tree without prop drilling</li>
          <li><strong>Syntax:</strong> <code>const value = useContext(MyContext)</code></li>
          <li><strong>Re-renders:</strong> Components using context re-render when context value changes</li>
          <li><strong>Optimization:</strong> Memoize context value and split contexts for better performance</li>
          <li><strong>Not for everything:</strong> Don't overuse - consider component composition first</li>
        </ul>
      </section>
    </div>
  );
}
