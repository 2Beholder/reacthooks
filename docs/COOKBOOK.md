# React Hooks Cookbook

A comprehensive guide to React Hooks patterns, organized by common problems and use cases. Each recipe includes the problem description, API design, implementation details, caveats, and minimal examples.

## Table of Contents

1. [State Management](#state-management)
2. [Side Effects](#side-effects)
3. [Performance Optimization](#performance-optimization)
4. [Custom Hooks Recipes](#custom-hooks-recipes)

---

## State Management

### Recipe 1: Simple State Management with useState

**Problem:** Need to manage local component state that triggers re-renders.

**When to Use:**
- Simple, independent state values
- Forms with controlled inputs
- Toggle states (modals, dropdowns)
- Counters and numeric values

**API Design:**
```typescript
const [value, setValue] = useState<T>(initialValue);
```

**Implementation Points:**
- State updates are asynchronous and batched
- Use functional updates when new state depends on previous: `setValue(prev => prev + 1)`
- Initial value can be a function for expensive computations: `useState(() => expensiveCalculation())`

**Caveats:**
- Don't mutate state directly - always create new values
- Multiple rapid updates might be batched together
- State is tied to component lifecycle

**Minimal Example:**
```typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Better: functional update */}
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </div>
  );
}
```

---

### Recipe 2: Complex State Logic with useReducer

**Problem:** State updates involve complex logic or multiple sub-values.

**When to Use:**
- Multiple state values that change together
- Complex state transitions
- State updates following specific rules (e.g., todo list, shopping cart)
- When next state depends on previous state in complex ways

**API Design:**
```typescript
type State = { /* ... */ };
type Action = { type: string; payload?: any };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* changes */ };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

**Implementation Points:**
- Reducer must be a pure function
- Return new state object (don't mutate)
- Use TypeScript discriminated unions for type-safe actions
- Can initialize lazily with third parameter

**Caveats:**
- More boilerplate than useState
- Overkill for simple state
- Actions are not type-checked at dispatch site without proper TypeScript setup

**Minimal Example:**
```typescript
type State = { count: number; step: number };
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set_step':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

---

### Recipe 3: Global State with useContext

**Problem:** Need to share state across multiple components without prop drilling.

**When to Use:**
- Theme settings
- User authentication state
- Language/locale preferences
- App-wide configuration

**API Design:**
```typescript
const MyContext = createContext<ContextType | undefined>(undefined);

function MyProvider({ children }: { children: ReactNode }) {
  const value = /* context value */;
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
}
```

**Implementation Points:**
- Always memoize context value to prevent unnecessary re-renders
- Create custom hook to enforce usage within provider
- Split contexts by update frequency
- Consider using separate contexts for data and updater functions

**Caveats:**
- All consumers re-render when context value changes
- Not a replacement for all prop passing
- Performance issues if overused or not optimized
- Context value must be referentially stable

**Minimal Example:**
```typescript
type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  // Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
  }), [theme]);
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

---

## Side Effects

### Recipe 4: Side Effects with useEffect

**Problem:** Need to perform side effects (data fetching, subscriptions, DOM manipulation) after render.

**When to Use:**
- Fetching data on component mount
- Setting up subscriptions or event listeners
- Manually updating the DOM
- Synchronizing with external systems

**API Design:**
```typescript
useEffect(() => {
  // Effect code
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

**Implementation Points:**
- Effect runs after render (after DOM updates)
- Cleanup runs before next effect and on unmount
- Empty deps array `[]` = run once on mount
- No deps array = run after every render
- With deps = run when deps change

**Caveats:**
- StrictMode runs effects twice in development
- Cleanup must handle all subscriptions/timers
- Avoid state updates that trigger infinite loops
- ESLint warnings about missing dependencies are usually correct

**Minimal Example:**
```typescript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup: clear interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty array: run once on mount
  
  return <div>Seconds: {seconds}</div>;
}
```

---

### Recipe 5: Ref for Mutable Values with useRef

**Problem:** Need to store a mutable value that doesn't trigger re-renders or access DOM elements.

**When to Use:**
- Storing DOM references
- Keeping previous values
- Storing timers/intervals
- Tracking render count
- Any mutable value that shouldn't trigger re-render

**API Design:**
```typescript
const ref = useRef<T>(initialValue);
// Access: ref.current
```

**Implementation Points:**
- Updating `ref.current` doesn't trigger re-renders
- Value persists across renders (unlike local variables)
- Common for DOM access via `ref` prop
- Useful for storing mutable instance variables

**Caveats:**
- Don't read/write ref.current during render (causes inconsistency)
- Changes to ref.current are not part of React's data flow
- Not suitable for values that should trigger re-renders

**Minimal Example:**
```typescript
function TextInputWithFocus() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

// Storing previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>();
  
  useEffect(() => {
    prevCountRef.current = count;
  });
  
  return <div>Now: {count}, Before: {prevCountRef.current}</div>;
}
```

---

## Performance Optimization

### Recipe 6: Memoizing Expensive Calculations with useMemo

**Problem:** Expensive calculations run on every render even when inputs haven't changed.

**When to Use:**
- Filtering/sorting large lists
- Complex computations
- Creating objects/arrays that are passed as props
- Avoiding expensive re-renders of child components

**API Design:**
```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

**Implementation Points:**
- Only recalculates when dependencies change
- Returns the memoized value
- Function runs during render (not in effect)
- Use for values, not side effects

**Caveats:**
- Don't overuse - adds overhead
- Premature optimization can make code harder to read
- Always profile before optimizing
- Memory trade-off: stores previous value

**Minimal Example:**
```typescript
function DataList({ items, filterText }: Props) {
  // Without memo: filters on every render
  // const filtered = items.filter(item => item.includes(filterText));
  
  // With memo: only filters when items or filterText changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => item.includes(filterText));
  }, [items, filterText]);
  
  return <ul>{filteredItems.map(item => <li key={item}>{item}</li>)}</ul>;
}
```

---

### Recipe 7: Memoizing Functions with useCallback

**Problem:** Functions recreated on every render cause child components to re-render unnecessarily.

**When to Use:**
- Passing callbacks to optimized child components (using React.memo)
- Functions in useEffect dependencies
- Preventing unnecessary effect runs
- Event handlers passed to many children

**API Design:**
```typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

**Implementation Points:**
- Returns memoized function reference
- Only creates new function when dependencies change
- Useful with React.memo to prevent child re-renders
- Similar to useMemo, but for functions

**Caveats:**
- Only beneficial with React.memo or dependency arrays
- Doesn't prevent function body execution
- Can lead to stale closures if dependencies are wrong

**Minimal Example:**
```typescript
const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Without useCallback: new function on every render
  // Child re-renders even when count hasn't changed
  // const handleClick = () => setCount(c => c + 1);
  
  // With useCallback: same function reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveChild onClick={handleClick} />
      <p>Count: {count}</p>
    </>
  );
}
```

---

### Recipe 8: Preventing Re-renders with React.memo

**Problem:** Child components re-render even when their props haven't changed.

**When to Use:**
- Expensive child components
- Components that render often
- Pure components with stable props
- Lists with many items

**API Design:**
```typescript
const MemoizedComponent = memo(Component, arePropsEqual?);
```

**Implementation Points:**
- Shallow compares props by default
- Can provide custom comparison function
- Works best with primitive props or memoized objects/functions
- Doesn't prevent re-renders from own state/context

**Caveats:**
- Adds overhead - use judiciously
- Doesn't work if props are new objects/functions each render
- Must use with useMemo/useCallback for complex props
- Not a substitute for proper component structure

**Minimal Example:**
```typescript
interface ItemProps {
  item: { id: number; name: string };
  onSelect: (id: number) => void;
}

const ListItem = memo(({ item, onSelect }: ItemProps) => {
  console.log('Rendering item:', item.id);
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  );
});

function List({ items }: { items: Array<{ id: number; name: string }> }) {
  const [selected, setSelected] = useState<number | null>(null);
  
  // Memoize callback to prevent ListItem re-renders
  const handleSelect = useCallback((id: number) => {
    setSelected(id);
  }, []);
  
  return (
    <>
      {items.map(item => (
        <ListItem key={item.id} item={item} onSelect={handleSelect} />
      ))}
    </>
  );
}
```

---

## Custom Hooks Recipes

### Recipe 9: Debouncing with useDebounce

**Problem:** Need to delay expensive operations (like API calls) until user stops typing.

**When to Use:**
- Search inputs
- Form validation
- API calls triggered by user input
- Any expensive operation triggered frequently

**Implementation:**
```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

**Caveats:**
- Introduces delay - consider UX implications
- Cleanup is crucial to prevent memory leaks
- Different from throttling (throttle = limit frequency, debounce = wait for pause)

**Usage Example:**
```typescript
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      // API call here
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
}
```

---

### Recipe 10: Persistent State with useLocalStorage

**Problem:** Need to persist state across page reloads and browser sessions.

**When to Use:**
- User preferences (theme, language)
- Form drafts
- Shopping cart
- Recently viewed items
- Any state that should survive page reload

**Implementation:**
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
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
```

**Caveats:**
- 5-10MB storage limit per domain
- Synchronous API (can block)
- Only stores strings (JSON serialization)
- Not available in private browsing mode
- Not secure - don't store sensitive data

**Usage Example:**
```typescript
function Settings() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
}
```

---

### Recipe 11: Event Listeners with useEventListener

**Problem:** Need to add event listeners that properly clean up on unmount.

**When to Use:**
- Keyboard shortcuts
- Window resize handlers
- Scroll events
- Mouse/touch events
- Custom DOM events

**Implementation:**
```typescript
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
): void {
  const savedHandler = useRef<typeof handler>();
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    
    const eventListener = (event: Event) => {
      savedHandler.current?.(event as WindowEventMap[K]);
    };
    
    element.addEventListener(eventName, eventListener);
    
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```

**Caveats:**
- Ref pattern prevents removing/re-adding listeners unnecessarily
- Element changes require cleanup and re-setup
- Consider event delegation for many similar listeners
- Be careful with passive listeners for scroll performance

**Usage Example:**
```typescript
function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);
  
  useEventListener('keydown', (event) => {
    if (event.key === targetKey) {
      setKeyPressed(true);
    }
  });
  
  useEventListener('keyup', (event) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
    }
  });
  
  return keyPressed;
}

function Component() {
  const enterPressed = useKeyPress('Enter');
  const escapePressed = useKeyPress('Escape');
  
  return (
    <div>
      <p>Enter pressed: {enterPressed ? 'Yes' : 'No'}</p>
      <p>Escape pressed: {escapePressed ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## Best Practices Summary

### General Rules

1. **Always include all dependencies** in useEffect, useMemo, and useCallback
2. **Clean up effects** that create subscriptions, timers, or event listeners
3. **Don't call hooks conditionally** - they must run in the same order every render
4. **Use TypeScript** for better type safety and developer experience
5. **Profile before optimizing** - don't prematurely optimize with useMemo/useCallback

### State Management

- **Start with useState** for simple state
- **Use useReducer** for complex state logic
- **Context for global state** but consider prop drilling first
- **Split contexts** by update frequency
- **Memoize context values** to prevent unnecessary re-renders

### Performance

- **React.memo** for expensive components
- **useMemo** for expensive calculations
- **useCallback** for functions passed to memoized components
- **Key prop** for list items to help React optimize
- **Code splitting** for large components

### Custom Hooks

- **Name starting with "use"** to follow convention
- **Extract reusable logic** into custom hooks
- **Return arrays for positional** values, objects for named values
- **Document hook dependencies** and behavior
- **Test custom hooks** separately from components

### StrictMode Behaviors

- **Effects run twice** in development to find bugs
- **Helps identify** side effects that aren't properly cleaned up
- **Don't disable it** - fix the underlying issues instead
- **Production builds** run effects once as expected
