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
      <h1>useRef 演示</h1>
      <p className="description">
        useRef 返回一个可变的 ref 对象，该对象在渲染之间保持不变。与 state 不同，更新 ref 不会触发重新渲染。
      </p>

      <section className="demo-box">
        <h2>示例 1：DOM 引用</h2>
        <div className="demo-content">
          <div className="form-group">
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="点击按钮聚焦我"
            />
          </div>
          <button onClick={focusInput}>聚焦输入框</button>
          <p className="tip">💡 useRef 可以持有 DOM 元素的引用</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：存储先前的值</h2>
        <div className="demo-content">
          <div className="counter-display">
            <div>
              <strong>当前：</strong> {count}
            </div>
            <div>
              <strong>上一次：</strong> {prevCountRef.current ?? '无'}
            </div>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>重置</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 Ref 在渲染之间保持不变，但更新时不会导致重新渲染</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 3：跟踪渲染次数</h2>
        <div className="demo-content">
          <div className="stats">
            <p>此组件已渲染 <strong>{renderCountRef.current}</strong> 次</p>
            <p>当前计数：<strong>{count}</strong></p>
          </div>
          <button onClick={() => setCount(count + 1)}>触发重新渲染</button>
          <p className="tip">💡 renderCountRef 增加时不会触发重新渲染</p>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>语法：</strong> <code>const ref = useRef(initialValue)</code></li>
          <li><strong>访问值：</strong> <code>ref.current</code></li>
          <li><strong>不重新渲染：</strong> 更新 ref.current 不会触发重新渲染</li>
          <li><strong>持久化：</strong> ref.current 在渲染之间保持不变（与局部变量不同）</li>
          <li><strong>常见用途：</strong> DOM 引用、存储先前值、保存可变数据</li>
        </ul>
      </section>
    </div>
  );
}
