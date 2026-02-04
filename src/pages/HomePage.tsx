import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>React Hooks 工作坊</h1>
      <p className="subtitle">60分钟掌握 React Hooks - 从基础到工程实践</p>

      <section className="demo-section">
        <h2>📚 第一部分：基础 Hooks（20分钟）</h2>
        <div className="demo-list">
          <Link to="/use-state" className="demo-link">
            <h3>useState</h3>
            <p>计数器 + 表单输入 - 学习状态管理基础</p>
          </Link>
          <Link to="/use-effect" className="demo-link">
            <h3>useEffect</h3>
            <p>副作用、清理函数和 StrictMode 行为</p>
          </Link>
          <Link to="/use-ref" className="demo-link">
            <h3>useRef</h3>
            <p>DOM 操作和跨渲染保存值</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>⚡ 第二部分：性能优化（15分钟）</h2>
        <div className="demo-list">
          <Link to="/use-memo-callback" className="demo-link">
            <h3>useMemo & useCallback</h3>
            <p>优化昂贵计算并防止不必要的重渲染</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>🔧 第三部分：高级 Hooks（15分钟）</h2>
        <div className="demo-list">
          <Link to="/use-reducer" className="demo-link">
            <h3>useReducer</h3>
            <p>复杂状态逻辑的 Todo 应用</p>
          </Link>
          <Link to="/use-context" className="demo-link">
            <h3>useContext</h3>
            <p>主题切换和 Context 优化模式</p>
          </Link>
        </div>
      </section>

      <section className="demo-section">
        <h2>🚀 第四部分：自定义 Hooks 与实战模式（10分钟）</h2>
        <div className="demo-list">
          <Link to="/use-debounce" className="demo-link">
            <h3>useDebounce</h3>
            <p>带防抖的搜索以获得更好的用户体验</p>
          </Link>
          <Link to="/use-local-storage" className="demo-link">
            <h3>useLocalStorage</h3>
            <p>跨会话持久化状态</p>
          </Link>
          <Link to="/use-event-listener" className="demo-link">
            <h3>useEventListener</h3>
            <p>键盘快捷键和事件处理</p>
          </Link>
          <Link to="/tanstack-query" className="demo-link">
            <h3>TanStack Query</h3>
            <p>数据获取、缓存、加载状态和错误处理</p>
          </Link>
        </div>
      </section>

      <footer className="workshop-footer">
        <p>💡 <strong>提示：</strong>查看 <Link to="/cookbook">Cookbook</Link> 快速参考指南！</p>
      </footer>
    </div>
  );
}
