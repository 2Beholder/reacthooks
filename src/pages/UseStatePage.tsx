import { useState } from 'react';

export default function UseStatePage() {
  // Example 1: Simple counter
  const [count, setCount] = useState(0);

  // Example 2: Controlled form input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="demo-page">
      <h1>useState 演示</h1>
      <p className="description">
        useState 是最基础的状态管理 Hook。它返回一个状态值和一个更新函数。
      </p>

      <section className="demo-box">
        <h2>示例 1：计数器</h2>
        <div className="demo-content">
          <div className="counter-display">
            <span className="count-value">{count}</span>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>重置</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className="tip">💡 状态更新会触发重新渲染</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：受控表单</h2>
        <div className="demo-content">
          <form onSubmit={(e) => { e.preventDefault(); alert(`姓名：${name}\n邮箱：${email}`); }}>
            <div className="form-group">
              <label htmlFor="name">姓名：</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入您的姓名"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱：</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入您的邮箱"
              />
            </div>
            <button type="submit">提交</button>
          </form>
          <div className="output">
            <p><strong>当前值：</strong></p>
            <p>姓名：{name || '(空)'}</p>
            <p>邮箱：{email || '(空)'}</p>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>语法：</strong> <code>const [value, setValue] = useState(initialValue)</code></li>
          <li><strong>更新是异步的：</strong> 状态更新会被批处理以提升性能</li>
          <li><strong>函数式更新：</strong> 当新状态依赖旧状态时使用 <code>setValue(prev =&gt; prev + 1)</code></li>
          <li><strong>初始值：</strong> 仅在首次渲染时使用；可以是用于昂贵计算的函数</li>
        </ul>
      </section>
    </div>
  );
}
