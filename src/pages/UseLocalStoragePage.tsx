import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function UseLocalStoragePage() {
  // Theme preference stored in localStorage
  const [themePreference, setThemePreference] = useLocalStorage<'system' | 'light' | 'dark'>(
    'theme-preference',
    'system'
  );

  // Draft content stored in localStorage
  const [draft, setDraft] = useLocalStorage('draft-content', '');

  // Counter stored in localStorage
  const [count, setCount] = useLocalStorage('persistent-count', 0);

  // Regular state for comparison
  const [regularState, setRegularState] = useState(0);

  const clearAllStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="demo-page">
      <h1>useLocalStorage Demo</h1>
      <p className="description">
        useLocalStorage syncs state with localStorage, persisting data across browser sessions. Perfect for user preferences, drafts, and other data that should survive page reloads.
      </p>

      <section className="demo-box">
        <h2>Example 1: Theme Preference</h2>
        <div className="demo-content">
          <div className="preference-selector">
            <p>Current preference: <strong>{themePreference}</strong></p>
            <div className="button-group">
              <button
                className={themePreference === 'system' ? 'active' : ''}
                onClick={() => setThemePreference('system')}
              >
                System
              </button>
              <button
                className={themePreference === 'light' ? 'active' : ''}
                onClick={() => setThemePreference('light')}
              >
                Light
              </button>
              <button
                className={themePreference === 'dark' ? 'active' : ''}
                onClick={() => setThemePreference('dark')}
              >
                Dark
              </button>
            </div>
          </div>
          <p className="tip">💡 Refresh the page - your preference persists!</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: Draft Persistence</h2>
        <div className="demo-content">
          <div className="form-group">
            <label htmlFor="draft">Write your draft:</label>
            <textarea
              id="draft"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Your draft is automatically saved..."
              rows={5}
            />
            <p className="meta">Characters: {draft.length}</p>
          </div>
          <button onClick={() => setDraft('')}>Clear Draft</button>
          <p className="tip">💡 Try typing, then refresh - your draft is saved!</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 3: State Comparison</h2>
        <div className="demo-content">
          <div className="comparison">
            <div>
              <h3>With localStorage</h3>
              <div className="counter-display">
                <span className="count-value">{count}</span>
              </div>
              <div className="button-group">
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <p className="tip">✅ Persists after refresh</p>
            </div>
            <div>
              <h3>Regular useState</h3>
              <div className="counter-display">
                <span className="count-value">{regularState}</span>
              </div>
              <div className="button-group">
                <button onClick={() => setRegularState(regularState - 1)}>-</button>
                <button onClick={() => setRegularState(0)}>Reset</button>
                <button onClick={() => setRegularState(regularState + 1)}>+</button>
              </div>
              <p className="tip">⚠️ Resets on refresh</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-box">
        <h2>Implementation</h2>
        <div className="demo-content">
          <pre className="code-block">{`import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
const [name, setName] = useLocalStorage('name', 'Guest');`}</pre>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Persistence:</strong> Data survives page reloads and browser restarts</li>
          <li><strong>Serialization:</strong> Uses JSON.stringify/parse to store complex objects</li>
          <li><strong>Storage limit:</strong> localStorage typically has 5-10MB limit per domain</li>
          <li><strong>Error handling:</strong> Wrap in try-catch for private browsing mode</li>
          <li><strong>Common uses:</strong> User preferences, form drafts, cached data, UI state</li>
        </ul>
        <button onClick={clearAllStorage} className="danger-btn">
          Clear All localStorage & Reload
        </button>
      </section>
    </div>
  );
}
