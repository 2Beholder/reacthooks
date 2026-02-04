import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function UseLocalStoragePage() {
  // Theme preference stored in localStorage
  const [themePreference, setThemePreference] = useLocalStorage<'system' | 'light' | 'dark'>(
    'theme-preference',
    'system'
  );

  // Draft content stored in localStorage
  const [draft, setDraft] = useLocalStorage('draft-content', '');

  // Counter stored in localStorage
  const [count, setCount] = useLocalStorage('persistent-count', 0);

  // Regular state for comparison
  const [regularState, setRegularState] = useState(0);

  const clearAllStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="demo-page">
      <h1>useLocalStorage 示例</h1>
      <p className="description">
        useLocalStorage 将状态与 localStorage 同步，使数据在浏览器会话之间持久化。非常适合用于用户偏好设置、草稿和其他需要在页面重新加载后保留的数据。
      </p>

      <section className="demo-box">
        <h2>示例 1：主题偏好</h2>
        <div className="demo-content">
          <div className="preference-selector">
            <p>当前偏好：<strong>{themePreference}</strong></p>
            <div className="button-group">
              <button
                className={themePreference === 'system' ? 'active' : ''}
                onClick={() => setThemePreference('system')}
              >
                跟随系统
              </button>
              <button
                className={themePreference === 'light' ? 'active' : ''}
                onClick={() => setThemePreference('light')}
              >
                浅色
              </button>
              <button
                className={themePreference === 'dark' ? 'active' : ''}
                onClick={() => setThemePreference('dark')}
              >
                深色
              </button>
            </div>
          </div>
          <p className="tip">💡 刷新页面 - 你的偏好设置会保留！</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：草稿持久化</h2>
        <div className="demo-content">
          <div className="form-group">
            <label htmlFor="draft">编写草稿：</label>
            <textarea
              id="draft"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="你的草稿会自动保存..."
              rows={5}
            />
            <p className="meta">字符数：{draft.length}</p>
          </div>
          <button onClick={() => setDraft('')}>清空草稿</button>
          <p className="tip">💡 试着输入一些内容，然后刷新 - 你的草稿已保存！</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 3：状态对比</h2>
        <div className="demo-content">
          <div className="comparison">
            <div>
              <h3>使用 localStorage</h3>
              <div className="counter-display">
                <span className="count-value">{count}</span>
              </div>
              <div className="button-group">
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(0)}>重置</button>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <p className="tip">✅ 刷新后会保留</p>
            </div>
            <div>
              <h3>普通 useState</h3>
              <div className="counter-display">
                <span className="count-value">{regularState}</span>
              </div>
              <div className="button-group">
                <button onClick={() => setRegularState(regularState - 1)}>-</button>
                <button onClick={() => setRegularState(0)}>重置</button>
                <button onClick={() => setRegularState(regularState + 1)}>+</button>
              </div>
              <p className="tip">⚠️ 刷新后会重置</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-box">
        <h2>实现方式</h2>
        <div className="demo-content">
          <pre className="code-block">{`import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
const [name, setName] = useLocalStorage('name', 'Guest');`}</pre>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>持久化：</strong> 数据在页面重新加载和浏览器重启后仍然保留</li>
          <li><strong>序列化：</strong> 使用 JSON.stringify/parse 存储复杂对象</li>
          <li><strong>存储限制：</strong> localStorage 通常每个域名有 5-10MB 的限制</li>
          <li><strong>错误处理：</strong> 使用 try-catch 包裹以处理隐私浏览模式</li>
          <li><strong>常见用途：</strong> 用户偏好设置、表单草稿、缓存数据、UI 状态</li>
        </ul>
        <button onClick={clearAllStorage} className="danger-btn">
          清空所有 localStorage 并重新加载
        </button>
      </section>
    </div>
  );
}
