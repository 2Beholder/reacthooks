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
    addLog('副作用：组件已渲染');
  });

  // Example 2: Effect with dependency array - runs only when count changes
  useEffect(() => {
    addLog(`副作用：count 改变为 ${count}`);
  }, [count]);

  // Example 3: Effect with cleanup - timer
  useEffect(() => {
    if (!isRunning) return;

    addLog('副作用：计时器启动');
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    // Cleanup function
    return () => {
      addLog('清理：计时器停止');
      clearInterval(interval);
    };
  }, [isRunning]);

  // Example 4: Mount/unmount effect (empty dependency array)
  useEffect(() => {
    addLog('副作用：组件已挂载');
    return () => {
      addLog('清理：组件即将卸载');
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
      <h1>useEffect 演示</h1>
      <p className="description">
        useEffect 允许你在函数组件中执行副作用。它在渲染后运行，并可在下次副作用或卸载前进行清理。
      </p>

      <section className="demo-box">
        <h2>示例 1：依赖数组</h2>
        <div className="demo-content">
          <div className="counter-display">
            <span className="count-value">{count}</span>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>重置</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 查看日志 - 副作用仅在 count 改变时运行</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：带清理的计时器</h2>
        <div className="demo-content">
          <div className="timer-display">
            <span className="time-value">{time}秒</span>
          </div>
          <div className="button-group">
            {!isRunning ? (
              <button onClick={startTimer}>启动计时器</button>
            ) : (
              <button onClick={stopTimer}>停止计时器</button>
            )}
          </div>
          <p className="tip">💡 清理函数会清除定时器以防止内存泄漏</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>副作用日志</h2>
        <div className="logs">
          {logs.length === 0 ? (
            <p className="empty-state">暂无日志...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          )}
        </div>
        <button onClick={() => setLogs([])}>清除日志</button>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>无依赖：</strong> <code>useEffect(() =&gt; ...)</code> - 每次渲染后运行</li>
          <li><strong>空依赖：</strong> <code>useEffect(() =&gt; ..., [])</code> - 仅在挂载时运行一次</li>
          <li><strong>有依赖：</strong> <code>useEffect(() =&gt; ..., [dep])</code> - 依赖改变时运行</li>
          <li><strong>清理：</strong> 返回一个函数进行清理（取消订阅、清除定时器等）</li>
          <li><strong>StrictMode：</strong> 在开发环境中，React 会运行副作用两次以帮助发现 bug</li>
        </ul>
      </section>
    </div>
  );
}
