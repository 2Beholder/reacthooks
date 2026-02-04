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
      <h1>useReducer 演示</h1>
      <p className="description">
        useReducer 是 useState 的替代方案，用于管理复杂的状态逻辑。当下一个状态依赖于前一个状态或有多个子值时特别有用。
      </p>

      <section className="demo-box">
        <h2>Todo 应用</h2>
        <div className="demo-content">
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="需要做什么？"
              className="todo-input"
            />
            <button type="submit">添加</button>
          </form>

          <div className="todo-filters">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              全部 ({stats.total})
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              进行中 ({stats.active})
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              已完成 ({stats.completed})
            </button>
          </div>

          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p className="empty-state">暂无待办事项</p>
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
              清除已完成
            </button>
          )}
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>语法：</strong> <code>const [state, dispatch] = useReducer(reducer, initialState)</code></li>
          <li><strong>Reducer 函数：</strong> <code>(state, action) =&gt; newState</code></li>
          <li><strong>何时使用：</strong> 复杂的状态逻辑、多个子值、下一个状态依赖于前一个状态</li>
          <li><strong>对比 useState：</strong> useReducer 更适合有多个操作的复杂状态更新</li>
          <li><strong>测试：</strong> Reducer 是纯函数，易于测试</li>
        </ul>
      </section>
    </div>
  );
}
