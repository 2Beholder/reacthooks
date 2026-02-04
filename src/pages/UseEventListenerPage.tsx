import { useState, useRef } from 'react';
import { useEventListener } from '../hooks/useEventListener';

export default function UseEventListenerPage() {
  const [key, setKey] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Example 1: Keyboard shortcuts
  useEventListener('keydown', (event) => {
    setKey(event.key);

    // Press '/' to focus search
    if (event.key === '/' && document.activeElement !== searchInputRef.current) {
      event.preventDefault();
      searchInputRef.current?.focus();
    }

    // Press 'Escape' to blur
    if (event.key === 'Escape') {
      searchInputRef.current?.blur();
    }
  });

  // Example 2: Track clicks
  useEventListener('click', () => {
    setClickCount(prev => prev + 1);
  });

  // Example 3: Track mouse movement
  useEventListener('mousemove', (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  });

  return (
    <div className="demo-page">
      <h1>useEventListener 示例</h1>
      <p className="description">
        useEventListener 提供了一种简洁的方式来添加事件监听器，当组件卸载时会自动清理。
      </p>

      <section className="demo-box">
        <h2>示例 1：键盘快捷键</h2>
        <div className="demo-content">
          <div className="keyboard-display">
            <p>最后按下的键：<strong>{key || '(无)'}</strong></p>
          </div>
          <div className="form-group">
            <label htmlFor="search">搜索：</label>
            <input
              ref={searchInputRef}
              id="search"
              type="text"
              placeholder="按 '/' 聚焦，按 'Esc' 失焦"
            />
          </div>
          <div className="shortcuts-help">
            <h4>键盘快捷键：</h4>
            <ul>
              <li><kbd>/</kbd> - 聚焦搜索输入框</li>
              <li><kbd>Esc</kbd> - 失焦已聚焦的输入框</li>
            </ul>
          </div>
          <p className="tip">💡 试着在页面任意位置按 '/' 键！</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 2：点击计数器</h2>
        <div className="demo-content">
          <div className="stats">
            <p>页面总点击次数：<strong>{clickCount}</strong></p>
          </div>
          <p className="tip">💡 页面上任意位置的每次点击都会被计数</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>示例 3：鼠标位置</h2>
        <div className="demo-content">
          <div className="mouse-tracker">
            <p>X：<strong>{mousePosition.x}</strong></p>
            <p>Y：<strong>{mousePosition.y}</strong></p>
            <div
              className="cursor-follower"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          </div>
          <p className="tip">💡 移动鼠标以查看坐标更新</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>实现方式</h2>
        <div className="demo-content">
          <pre className="code-block">{`import { useEffect, useRef } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
) {
  const savedHandler = useRef<typeof handler>();

  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler in ref
    const eventListener = (event: Event) => {
      savedHandler.current?.(event as WindowEventMap[K]);
    };

    element.addEventListener(eventName, eventListener);

    // Clean up
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Usage
useEventListener('keydown', (event) => {
  if (event.key === '/') {
    inputRef.current?.focus();
  }
});`}</pre>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>自动清理：</strong>组件卸载时自动移除事件监听器</li>
          <li><strong>使用 Ref 保存处理器：</strong>防止每次处理器变化时重新创建监听器</li>
          <li><strong>类型安全：</strong>TypeScript 确保事件类型正确</li>
          <li><strong>常见用途：</strong>键盘快捷键、窗口大小调整、滚动事件、鼠标跟踪</li>
          <li><strong>性能：</strong>比直接在组件中添加监听器更好</li>
        </ul>
      </section>
    </div>
  );
}
