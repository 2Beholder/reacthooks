import { useReducer, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

export default function UseReducerPage() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <div className="demo-page">
      <h1>useReducer Demo</h1>
      <p className="description">
        useReducer is an alternative to useState for managing complex state logic. It's especially useful when the next state depends on the previous one or when you have multiple sub-values.
      </p>

      <section className="demo-box">
        <h2>Todo App</h2>
        <div className="demo-content">
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button type="submit">Add</button>
          </form>

          <div className="todo-filters">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active ({stats.active})
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed ({stats.completed})
            </button>
          </div>

          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p className="empty-state">No todos to display</p>
            ) : (
              filteredTodos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  />
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {stats.completed > 0 && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
              className="clear-completed"
            >
              Clear Completed
            </button>
          )}
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>Syntax:</strong> <code>const [state, dispatch] = useReducer(reducer, initialState)</code></li>
          <li><strong>Reducer function:</strong> <code>(state, action) =&gt; newState</code></li>
          <li><strong>When to use:</strong> Complex state logic, multiple sub-values, next state depends on previous</li>
          <li><strong>vs useState:</strong> useReducer is better for complex state updates with multiple actions</li>
          <li><strong>Testing:</strong> Reducers are pure functions, making them easy to test</li>
        </ul>
      </section>
    </div>
  );
}
