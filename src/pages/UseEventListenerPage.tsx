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
      <h1>useEventListener Demo</h1>
      <p className="description">
        useEventListener provides a clean way to add event listeners that automatically clean up when the component unmounts.
      </p>

      <section className="demo-box">
        <h2>Example 1: Keyboard Shortcuts</h2>
        <div className="demo-content">
          <div className="keyboard-display">
            <p>Last key pressed: <strong>{key || '(none)'}</strong></p>
          </div>
          <div className="form-group">
            <label htmlFor="search">Search:</label>
            <input
              ref={searchInputRef}
              id="search"
              type="text"
              placeholder="Press '/' to focus me, 'Esc' to blur"
            />
          </div>
          <div className="shortcuts-help">
            <h4>Keyboard Shortcuts:</h4>
            <ul>
              <li><kbd>/</kbd> - Focus search input</li>
              <li><kbd>Esc</kbd> - Blur focused input</li>
            </ul>
          </div>
          <p className="tip">💡 Try pressing '/' anywhere on the page!</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 2: Click Counter</h2>
        <div className="demo-content">
          <div className="stats">
            <p>Total clicks on page: <strong>{clickCount}</strong></p>
          </div>
          <p className="tip">💡 Every click anywhere on the page is counted</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Example 3: Mouse Position</h2>
        <div className="demo-content">
          <div className="mouse-tracker">
            <p>X: <strong>{mousePosition.x}</strong></p>
            <p>Y: <strong>{mousePosition.y}</strong></p>
            <div
              className="cursor-follower"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          </div>
          <p className="tip">💡 Move your mouse to see coordinates update</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Implementation</h2>
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
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Automatic cleanup:</strong> Removes event listeners on unmount</li>
          <li><strong>Ref for handler:</strong> Prevents recreating listener on every handler change</li>
          <li><strong>Type safety:</strong> TypeScript ensures correct event types</li>
          <li><strong>Common uses:</strong> Keyboard shortcuts, window resize, scroll events, mouse tracking</li>
          <li><strong>Performance:</strong> Better than adding listeners directly in components</li>
        </ul>
      </section>
    </div>
  );
}
