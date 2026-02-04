import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

// Mock data for search
const items = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Java',
  'Go', 'Rust', 'Swift', 'Kotlin', 'C++',
  'Ruby', 'PHP', 'C#', 'HTML', 'CSS',
  'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
];

export default function UseDebouncePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  
  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // This effect represents an expensive operation (like an API call)
  // It only runs when the debounced value changes
  const results = items.filter(item =>
    item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Count how many times search actually executes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Increment immediately to show the difference
    setSearchCount(prev => prev + 1);
  };

  return (
    <div className="demo-page">
      <h1>useDebounce 示例</h1>
      <p className="description">
        useDebounce 会延迟更新值，直到最后一次更改后经过指定时间。非常适合用于搜索输入以减少 API 调用。
      </p>

      <section className="demo-box">
        <h2>防抖搜索</h2>
        <div className="demo-content">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="输入以搜索..."
              className="search-input"
            />
            <div className="search-stats">
              <p>按键次数：<strong>{searchCount}</strong></p>
              <p>实际搜索次数：<strong>{debouncedSearchTerm ? 1 : 0}</strong></p>
              <p>搜索词：<strong>{debouncedSearchTerm || '(无)'}</strong></p>
            </div>
          </div>

          <div className="results">
            <h3>结果 ({results.length})</h3>
            {debouncedSearchTerm === '' ? (
              <p className="empty-state">开始输入以搜索...</p>
            ) : results.length === 0 ? (
              <p className="empty-state">未找到结果</p>
            ) : (
              <ul className="results-list">
                {results.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <p className="tip">💡 注意结果只在你停止输入 500 毫秒后才会更新</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>实现方式</h2>
        <div className="demo-content">
          <pre className="code-block">{`import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);`}</pre>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>用途：</strong> 延迟昂贵的操作（API 调用、过滤等）</li>
          <li><strong>性能：</strong> 显著减少操作次数</li>
          <li><strong>用户体验：</strong> 比节流（throttling）响应更灵敏</li>
          <li><strong>常见用例：</strong> 搜索输入、表单验证、窗口大小调整处理</li>
          <li><strong>清理：</strong> 始终清除定时器以防止内存泄漏</li>
        </ul>
      </section>
    </div>
  );
}
