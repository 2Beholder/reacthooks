import { useTheme } from '../context/ThemeContext';

export default function UseContextPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="demo-page">
      <h1>useContext 演示</h1>
      <p className="description">
        useContext 提供了一种通过组件树传递数据的方法，无需在每个层级手动传递 props。
      </p>

      <section className="demo-box">
        <h2>主题切换器</h2>
        <div className="demo-content">
          <div className={`theme-preview ${theme}`}>
            <p>当前主题：<strong>{theme === 'light' ? '浅色' : '深色'}</strong></p>
            <button onClick={toggleTheme}>
              切换到 {theme === 'light' ? '深色' : '浅色'} 模式
            </button>
          </div>
          <p className="tip">💡 此主题保存在 localStorage 中，并在整个应用中共享！</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>工作原理</h2>
        <div className="demo-content">
          <div className="code-example">
            <h3>1. 创建 Context</h3>
            <pre>{`const ThemeContext = createContext();`}</pre>

            <h3>2. 提供 Context</h3>
            <pre>{`<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>`}</pre>

            <h3>3. 使用 Context</h3>
            <pre>{`const { theme, toggleTheme } = useContext(ThemeContext);`}</pre>
          </div>
        </div>
      </section>

      <section className="demo-box">
        <h2>优化技巧</h2>
        <div className="demo-content">
          <div className="tips-list">
            <div className="tip-item">
              <h4>✅ 缓存 Context 值</h4>
              <p>使用 useMemo 防止 context 值改变时不必要的重新渲染</p>
              <pre>{`const value = useMemo(() => ({ theme, toggleTheme }), [theme]);`}</pre>
            </div>
            <div className="tip-item">
              <h4>✅ 拆分 Context</h4>
              <p>将频繁变化的值拆分到单独的 context 中</p>
              <pre>{`<ThemeContext.Provider>
  <UserContext.Provider>
    {children}
  </UserContext.Provider>
</ThemeContext.Provider>`}</pre>
            </div>
            <div className="tip-item">
              <h4>✅ 自定义 Hook</h4>
              <p>创建自定义 hook 以强制在 provider 内使用</p>
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
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>目的：</strong> 在组件树中共享数据，无需层层传递 props</li>
          <li><strong>语法：</strong> <code>const value = useContext(MyContext)</code></li>
          <li><strong>重新渲染：</strong> 使用 context 的组件会在 context 值改变时重新渲染</li>
          <li><strong>优化：</strong> 缓存 context 值并拆分 context 以获得更好的性能</li>
          <li><strong>不要过度使用：</strong> 不要滥用 - 首先考虑组件组合</li>
        </ul>
      </section>
    </div>
  );
}
