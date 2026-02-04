# React Hooks Workshop

A comprehensive, runnable demo application showcasing React Hooks from basics to engineering best practices. Perfect for a 60-minute workshop or self-paced learning.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20 LTS or higher recommended
- **npm**: v9 or higher

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/2Beholder/reacthooks.git
cd reacthooks

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to explore the demos!

## 📚 What's Included

This workshop covers React Hooks through hands-on, interactive demos organized in a progressive learning path:

### Part 1: Basic Hooks (20 minutes)
- **useState**: Counter and form input examples
- **useEffect**: Side effects, cleanup, and StrictMode behavior
- **useRef**: DOM manipulation and value persistence

### Part 2: Performance Optimization (15 minutes)
- **useMemo & useCallback**: Optimize computations and prevent unnecessary re-renders
- **React.memo**: Component memoization for better performance

### Part 3: Advanced Hooks (15 minutes)
- **useReducer**: Complex state management with a Todo app
- **useContext**: Global state management with theme switching

### Part 4: Custom Hooks & Real-World Patterns (10 minutes)
- **useDebounce**: Search with debouncing
- **useLocalStorage**: Persistent state across sessions
- **useEventListener**: Keyboard shortcuts and event handling
- **TanStack Query**: Production-ready data fetching with caching

## 🎯 Demo Navigation

Each demo page includes:
- ✅ Live, interactive examples
- 📝 Key concepts and best practices
- ⚠️ Common pitfalls and how to avoid them
- 💡 Pro tips and optimization techniques
- 📋 Minimal code examples for reference

## 📖 Documentation

- **[Cookbook](docs/COOKBOOK.md)**: Quick reference guide organized by problem type (state, side effects, performance, custom hooks)
  - Each recipe includes: use case, API design, implementation, caveats, and examples
  - Best practices summary
  - StrictMode behaviors explained

## 🎓 60-Minute Workshop Flow

1. **Introduction (5 min)**: Overview of React Hooks and demo app navigation
2. **Basic Hooks (20 min)**: useState, useEffect, useRef with live coding
3. **Performance (15 min)**: useMemo, useCallback, React.memo demonstrations
4. **Advanced Hooks (15 min)**: useReducer and useContext patterns
5. **Custom Hooks (5 min)**: Quick tour of useDebounce, useLocalStorage, useEventListener, TanStack Query

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **TanStack Query** for data fetching
- **ESLint** for code quality

## 📦 Project Structure

```
reacthooks/
├── src/
│   ├── hooks/              # Custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useEventListener.ts
│   ├── context/            # React contexts
│   │   └── ThemeContext.tsx
│   ├── pages/              # Demo pages
│   │   ├── HomePage.tsx
│   │   ├── UseStatePage.tsx
│   │   ├── UseEffectPage.tsx
│   │   └── ... (more demos)
│   ├── App.tsx             # Main app with routing
│   ├── App.css             # Styling
│   └── main.tsx            # Entry point
├── docs/
│   └── COOKBOOK.md         # Reference guide
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 💡 Key Features

- ✨ **TypeScript**: Full type safety
- 🎨 **Theme Support**: Dark/light mode with localStorage persistence
- 📱 **Responsive**: Works on mobile and desktop
- ♿ **Accessible**: Keyboard shortcuts and proper semantics
- 🔍 **Search Demos**: Try pressing `/` anywhere to focus search (in useEventListener demo)
- 💾 **Persistent State**: Theme and other settings saved across sessions

## 🎯 Learning Objectives

By the end of this workshop, you'll understand:
- How to manage state effectively with useState and useReducer
- When and how to use useEffect with proper cleanup
- Performance optimization with useMemo, useCallback, and React.memo
- Sharing state with useContext
- Creating custom hooks for reusable logic
- Real-world data fetching with TanStack Query
- Common pitfalls and best practices

## 📝 Notes for Presenters

- Each demo is self-contained and can run independently
- Code examples are minimal and focused on core concepts
- All demos include visual feedback for better understanding
- StrictMode is enabled to demonstrate proper cleanup patterns
- Console logs are used strategically to show hook behavior

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new demo ideas
- Improve documentation
- Add more examples

## 📄 License

MIT

## 🙏 Acknowledgments

Built with modern React best practices for the community. Special thanks to the React team for creating such powerful hooks!
