import { useState } from 'react';

export default function UseStatePage() {
  // Example 1: Simple counter
  const [count, setCount] = useState(0);

  // Example 2: Controlled form input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="demo-page">
      <h1>useState Demo</h1>
      <p className="description">
        useState is the most basic hook for managing component state. It returns a stateful value and a function to update it.
      </p>

      <section className="demo-box">
        <h2>Example 1: Counter</h2>
        <div className="demo-content">
          <div className="counter-display">
            <span className="count-value">{count}</span>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 State updates trigger re-renders</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: Controlled Form</h2>
        <div className="demo-content">
          <form onSubmit={(e) => { e.preventDefault(); alert(`Name: ${name}\nEmail: ${email}`); }}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="output">
            <p><strong>Current values:</strong></p>
            <p>Name: {name || '(empty)'}</p>
            <p>Email: {email || '(empty)'}</p>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Syntax:</strong> <code>const [value, setValue] = useState(initialValue)</code></li>
          <li><strong>Updates are async:</strong> State updates are batched for performance</li>
          <li><strong>Functional updates:</strong> Use <code>setValue(prev =&gt; prev + 1)</code> when new state depends on previous state</li>
          <li><strong>Initial value:</strong> Only used on first render; can be a function for expensive computations</li>
        </ul>
      </section>
    </div>
  );
}
