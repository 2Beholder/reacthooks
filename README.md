# React Hooks 工作坊

一个全面的、可运行的演示应用，展示 React Hooks 从基础到工程实践。适合 60 分钟工作坊或自学。

**界面语言：中文**（技术术语如 Hook 名称保留英文）

## 🚀 快速开始

### 环境要求
- **Node.js**: v20 LTS 或更高版本（推荐）
- **npm**: v9 或更高版本

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/2Beholder/reacthooks.git
cd reacthooks

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 探索演示！

## 📚 内容概览

本工作坊通过实践性、交互式的演示，按渐进式学习路径涵盖 React Hooks：

### 第一部分：基础 Hooks（20分钟）
- **useState**: 计数器和表单输入示例
- **useEffect**: 副作用、清理和 StrictMode 行为
- **useRef**: DOM 操作和值持久化

### 第二部分：性能优化（15分钟）
- **useMemo & useCallback**: 优化计算并防止不必要的重新渲染
- **React.memo**: 组件缓存以提升性能

### 第三部分：高级 Hooks（15分钟）
- **useReducer**: 使用 Todo 应用进行复杂状态管理
- **useContext**: 通过主题切换进行全局状态管理

### 第四部分：自定义 Hooks 与实战模式（10分钟）
- **useDebounce**: 带防抖的搜索
- **useLocalStorage**: 跨会话持久化状态
- **useEventListener**: 键盘快捷键和事件处理
- **TanStack Query**: 带缓存的生产级数据获取

## 🎯 演示导航

每个演示页面包括：
- ✅ 实时、交互式示例
- 📝 关键概念和最佳实践
- ⚠️ 常见陷阱及避免方法
- 💡 专业技巧和优化技术
- 📋 最小化代码示例供参考

## 📖 文档

- **[Cookbook](docs/COOKBOOK.md)**: 按问题类型组织的快速参考指南（状态、副作用、性能、自定义 hooks）
  - 每个配方包括：使用场景、API 设计、实现、注意事项和示例
  - 最佳实践总结
  - StrictMode 行为说明

## 🎓 60分钟工作坊流程

1. **简介（5分钟）**: React Hooks 概览和演示应用导航
2. **基础 Hooks（20分钟）**: useState、useEffect、useRef 实时编码
3. **性能优化（15分钟）**: useMemo、useCallback、React.memo 演示
4. **高级 Hooks（15分钟）**: useReducer 和 useContext 模式
5. **自定义 Hooks（5分钟）**: useDebounce、useLocalStorage、useEventListener、TanStack Query 快速浏览

## 🛠 技术栈

- **React 18** 使用 TypeScript
- **Vite** 快速开发和构建
- **React Router** 导航
- **TanStack Query** 数据获取
- **ESLint** 代码质量检查

## 📦 项目结构

```
reacthooks/
├── src/
│   ├── hooks/              # 自定义 hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useEventListener.ts
│   ├── context/            # React contexts
│   │   └── ThemeContext.tsx
│   ├── pages/              # 演示页面
│   │   ├── HomePage.tsx
│   │   ├── UseStatePage.tsx
│   │   ├── UseEffectPage.tsx
│   │   └── ... (更多演示)
│   ├── App.tsx             # 带路由的主应用
│   ├── App.css             # 样式
│   └── main.tsx            # 入口点
├── docs/
│   └── COOKBOOK.md         # 参考指南
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🔧 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 生产环境构建
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint

## 💡 主要特性

- ✨ **TypeScript**: 完整的类型安全
- 🎨 **主题支持**: 深色/浅色模式，通过 localStorage 持久化
- 📱 **响应式**: 支持移动端和桌面端
- ♿ **无障碍**: 键盘快捷键和适当的语义化
- 🔍 **搜索演示**: 在任何地方按 `/` 聚焦搜索（在 useEventListener 演示中）
- 💾 **持久化状态**: 主题和其他设置在会话间保存

## 🎯 学习目标

完成本工作坊后，你将理解：
- 如何使用 useState 和 useReducer 有效管理状态
- 何时以及如何使用 useEffect 进行适当的清理
- 使用 useMemo、useCallback 和 React.memo 进行性能优化
- 使用 useContext 共享状态
- 创建可重用逻辑的自定义 hooks
- 使用 TanStack Query 进行实际的数据获取
- 常见陷阱和最佳实践

## 📝 演讲者注意事项

- 每个演示都是独立的，可以单独运行
- 代码示例简洁，专注于核心概念
- 所有演示都包含视觉反馈以便更好理解
- 启用了 StrictMode 以演示正确的清理模式
- 策略性使用控制台日志来展示 hook 行为

## 🤝 贡献

欢迎贡献！随时：
- 报告 bug
- 建议新的演示想法
- 改进文档
- 添加更多示例

## 📄 许可证

MIT

## 🙏 致谢

使用现代 React 最佳实践为社区构建。特别感谢 React 团队创建了如此强大的 hooks！
