import { useState, useMemo, useCallback, memo } from 'react';

// Track render counts using refs
let expensiveChildRenderCount = 0;
let normalChildRenderCount = 0;

// Child component that tracks render count
const ExpensiveChild = memo(({ value, onClick }: { value: number; onClick: () => void }) => {
  const renderCount = ++expensiveChildRenderCount;
  console.log(`ExpensiveChild rendered ${renderCount} times`);

  return (
    <div className="child-component">
      <p>Value: {value}</p>
      <p>Render count: {renderCount}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
});

// Child without memo
const NormalChild = ({ value, onClick }: { value: number; onClick: () => void }) => {
  const renderCount = ++normalChildRenderCount;
  console.log(`NormalChild rendered ${renderCount} times`);

  return (
    <div className="child-component">
      <p>Value: {value}</p>
      <p>Render count: {renderCount}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default function UseMemoCallbackPage() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [numbers] = useState(() => Array.from({ length: 10000 }, (_, i) => i));

  // Without useMemo - expensive calculation runs on every render
  const sumWithoutMemo = () => {
    console.log('Calculating sum without memo...');
    return numbers.reduce((acc, n) => acc + n, 0);
  };

  // With useMemo - expensive calculation runs only when numbers change
  const sumWithMemo = useMemo(() => {
    console.log('Calculating sum with memo...');
    return numbers.reduce((acc, n) => acc + n, 0);
  }, [numbers]);

  // Without useCallback - new function on every render
  const handleClickWithoutCallback = () => {
    console.log('Clicked without callback!');
  };

  // With useCallback - same function reference when dependencies don't change
  const handleClickWithCallback = useCallback(() => {
    console.log('Clicked with callback!');
  }, []);

  return (
    <div className="demo-page">
      <h1>useMemo & useCallback Demo</h1>
      <p className="description">
        useMemo and useCallback optimize performance by memoizing values and functions, preventing unnecessary recalculations and re-renders.
      </p>

      <section className="demo-box">
        <h2>Example 1: useMemo - Expensive Calculation</h2>
        <div className="demo-content">
          <div className="stats">
            <p><strong>Sum without memo:</strong> {sumWithoutMemo()}</p>
            <p><strong>Sum with memo:</strong> {sumWithMemo}</p>
          </div>
          <div className="controls">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type to trigger re-render..."
            />
          </div>
          <p className="tip">💡 Check console - memoized calculation only runs when dependencies change</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: useCallback + React.memo</h2>
        <div className="demo-content">
          <div className="comparison">
            <div>
              <h3>Without useCallback</h3>
              <NormalChild value={count} onClick={handleClickWithoutCallback} />
              <p className="tip">⚠️ Re-renders every time parent renders</p>
            </div>
            <div>
              <h3>With useCallback + memo</h3>
              <ExpensiveChild value={count} onClick={handleClickWithCallback} />
              <p className="tip">✅ Only re-renders when value changes</p>
            </div>
          </div>
          <div className="controls">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type to trigger parent re-render..."
            />
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>useMemo:</strong> Memoizes a computed value - <code>useMemo(() =&gt; expensive(), [deps])</code></li>
          <li><strong>useCallback:</strong> Memoizes a function - <code>useCallback(() =&gt; fn(), [deps])</code></li>
          <li><strong>React.memo:</strong> Higher-order component that prevents re-renders when props haven't changed</li>
          <li><strong>When to use:</strong> For expensive calculations, preventing unnecessary re-renders of child components</li>
          <li><strong>Don't overuse:</strong> Premature optimization can make code harder to read. Profile first!</li>
        </ul>
      </section>
    </div>
  );
}
