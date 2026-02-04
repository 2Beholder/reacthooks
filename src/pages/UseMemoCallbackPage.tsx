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
      <h1>useMemo & useCallback 演示</h1>
      <p className="description">
        useMemo 和 useCallback 通过缓存值和函数来优化性能，防止不必要的重新计算和重新渲染。
      </p>

      <section className="demo-box">
        <h2>示例 1：useMemo - 昂贵的计算</h2>
        <div className="demo-content">
          <div className="stats">
            <p><strong>无缓存的总和：</strong> {sumWithoutMemo()}</p>
            <p><strong>有缓存的总和：</strong> {sumWithMemo}</p>
          </div>
          <div className="controls">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入以触发重新渲染..."
            />
          </div>
          <p className="tip">💡 查看控制台 - 缓存的计算仅在依赖改变时运行</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：useCallback + React.memo</h2>
        <div className="demo-content">
          <div className="comparison">
            <div>
              <h3>不使用 useCallback</h3>
              <NormalChild value={count} onClick={handleClickWithoutCallback} />
              <p className="tip">⚠️ 每次父组件渲染都会重新渲染</p>
            </div>
            <div>
              <h3>使用 useCallback + memo</h3>
              <ExpensiveChild value={count} onClick={handleClickWithCallback} />
              <p className="tip">✅ 仅在 value 改变时重新渲染</p>
            </div>
          </div>
          <div className="controls">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入以触发父组件重新渲染..."
            />
            <button onClick={() => setCount(count + 1)}>增加计数</button>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>useMemo：</strong> 缓存计算值 - <code>useMemo(() =&gt; expensive(), [deps])</code></li>
          <li><strong>useCallback：</strong> 缓存函数 - <code>useCallback(() =&gt; fn(), [deps])</code></li>
          <li><strong>React.memo：</strong> 高阶组件，当 props 未改变时防止重新渲染</li>
          <li><strong>何时使用：</strong> 用于昂贵的计算、防止子组件不必要的重新渲染</li>
          <li><strong>不要过度使用：</strong> 过早优化会使代码更难阅读。先进行性能分析！</li>
        </ul>
      </section>
    </div>
  );
}
