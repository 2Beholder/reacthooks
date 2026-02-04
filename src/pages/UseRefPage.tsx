import { useState, useRef, useEffect } from 'react';

export default function UseRefPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Example 1: DOM reference
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Example 2: Storing previous value
  const prevCountRef = useRef<number>();
  
  // Example 3: Storing mutable value that doesn't trigger re-render
  const renderCountRef = useRef(0);

  useEffect(() => {
    // Store previous count
    prevCountRef.current = count;
    // Increment render count
    renderCountRef.current += 1;
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="demo-page">
      <h1>useRef Demo</h1>
      <p className="description">
        useRef returns a mutable ref object that persists across renders. Unlike state, updating a ref doesn't trigger a re-render.
      </p>

      <section className="demo-box">
        <h2>Example 1: DOM Reference</h2>
        <div className="demo-content">
          <div className="form-group">
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Click button to focus me"
            />
          </div>
          <button onClick={focusInput}>Focus Input</button>
          <p className="tip">💡 useRef can hold a reference to a DOM element</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: Storing Previous Value</h2>
        <div className="demo-content">
          <div className="counter-display">
            <div>
              <strong>Current:</strong> {count}
            </div>
            <div>
              <strong>Previous:</strong> {prevCountRef.current ?? 'N/A'}
            </div>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 Ref persists between renders but doesn't cause re-renders when updated</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 3: Tracking Renders</h2>
        <div className="demo-content">
          <div className="stats">
            <p>This component has rendered <strong>{renderCountRef.current}</strong> times</p>
            <p>Current count: <strong>{count}</strong></p>
          </div>
          <button onClick={() => setCount(count + 1)}>Trigger Re-render</button>
          <p className="tip">💡 renderCountRef doesn't trigger re-renders when incremented</p>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Syntax:</strong> <code>const ref = useRef(initialValue)</code></li>
          <li><strong>Access value:</strong> <code>ref.current</code></li>
          <li><strong>No re-render:</strong> Updating ref.current doesn't trigger a re-render</li>
          <li><strong>Persists:</strong> ref.current persists across renders (unlike local variables)</li>
          <li><strong>Common uses:</strong> DOM references, storing previous values, keeping mutable data</li>
        </ul>
      </section>
    </div>
  );
}
