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
      <h1>useDebounce Demo</h1>
      <p className="description">
        useDebounce delays updating a value until after a specified time has passed since the last change. Perfect for search inputs to reduce API calls.
      </p>

      <section className="demo-box">
        <h2>Search with Debouncing</h2>
        <div className="demo-content">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type to search..."
              className="search-input"
            />
            <div className="search-stats">
              <p>Keystrokes: <strong>{searchCount}</strong></p>
              <p>Actual searches: <strong>{debouncedSearchTerm ? 1 : 0}</strong></p>
              <p>Search term: <strong>{debouncedSearchTerm || '(none)'}</strong></p>
            </div>
          </div>

          <div className="results">
            <h3>Results ({results.length})</h3>
            {debouncedSearchTerm === '' ? (
              <p className="empty-state">Start typing to search...</p>
            ) : results.length === 0 ? (
              <p className="empty-state">No results found</p>
            ) : (
              <ul className="results-list">
                {results.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <p className="tip">💡 Notice how results update only after you stop typing for 500ms</p>
        </div>
      </section>

      <section className="demo-box">
        <h2>Implementation</h2>
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
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Purpose:</strong> Delay expensive operations (API calls, filtering, etc.)</li>
          <li><strong>Performance:</strong> Reduces number of operations significantly</li>
          <li><strong>User Experience:</strong> Feels more responsive than throttling</li>
          <li><strong>Common use cases:</strong> Search inputs, form validation, window resize handlers</li>
          <li><strong>Cleanup:</strong> Always clear timeouts to prevent memory leaks</li>
        </ul>
      </section>
    </div>
  );
}
