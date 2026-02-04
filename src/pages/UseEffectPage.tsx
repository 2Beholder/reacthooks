import { useState, useEffect } from 'react';

export default function UseEffectPage() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // Example 1: Effect runs on every render
  useEffect(() => {
    addLog('Effect: Component rendered');
  });

  // Example 2: Effect with dependency array - runs only when count changes
  useEffect(() => {
    addLog(`Effect: Count changed to ${count}`);
  }, [count]);

  // Example 3: Effect with cleanup - timer
  useEffect(() => {
    if (!isRunning) return;

    addLog('Effect: Timer started');
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    // Cleanup function
    return () => {
      addLog('Cleanup: Timer stopped');
      clearInterval(interval);
    };
  }, [isRunning]);

  // Example 4: Mount/unmount effect (empty dependency array)
  useEffect(() => {
    addLog('Effect: Component mounted');
    return () => {
      addLog('Cleanup: Component will unmount');
    };
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setTime(0);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <div className="demo-page">
      <h1>useEffect Demo</h1>
      <p className="description">
        useEffect lets you perform side effects in function components. It runs after render and can optionally clean up before the next effect or unmount.
      </p>

      <section className="demo-box">
        <h2>Example 1: Dependency Array</h2>
        <div className="demo-content">
          <div className="counter-display">
            <span className="count-value">{count}</span>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 Watch the logs - effect runs only when count changes</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: Timer with Cleanup</h2>
        <div className="demo-content">
          <div className="timer-display">
            <span className="time-value">{time}s</span>
          </div>
          <div className="button-group">
            {!isRunning ? (
              <button onClick={startTimer}>Start Timer</button>
            ) : (
              <button onClick={stopTimer}>Stop Timer</button>
            )}
          </div>
          <p className="tip">💡 Cleanup function clears the interval to prevent memory leaks</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Effect Logs</h2>
        <div className="logs">
          {logs.length === 0 ? (
            <p className="empty-state">No logs yet...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          )}
        </div>
        <button onClick={() => setLogs([])}>Clear Logs</button>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>No deps:</strong> <code>useEffect(() =&gt; ...)</code> - runs after every render</li>
          <li><strong>Empty deps:</strong> <code>useEffect(() =&gt; ..., [])</code> - runs only once on mount</li>
          <li><strong>With deps:</strong> <code>useEffect(() =&gt; ..., [dep])</code> - runs when deps change</li>
          <li><strong>Cleanup:</strong> Return a function to clean up (unsubscribe, clear timers, etc.)</li>
          <li><strong>StrictMode:</strong> In development, React runs effects twice to help find bugs</li>
        </ul>
      </section>
    </div>
  );
}
