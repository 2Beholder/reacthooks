import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
};

const fetchUserById = async (id: number): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const users = await fetchUsers();
  const user = users.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};

const deleteUser = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Deleted user:', id);
};

export default function TanStackQueryPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Query for fetching all users
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000, // Data is fresh for 5 seconds
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });

  // Query for fetching a specific user
  const userQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => fetchUserById(selectedUserId!),
    enabled: selectedUserId !== null, // Only run when a user is selected
  });

  // Mutation for deleting a user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users after deletion
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="demo-page">
      <h1>TanStack Query 示例</h1>
      <p className="description">
        TanStack Query（原 React Query）提供了强大的数据获取功能，内置缓存、加载状态、错误处理等。
      </p>

      <section className="demo-box">
        <h2>用户列表</h2>
        <div className="demo-content">
          <div className="query-status">
            <p>状态：<strong>{usersQuery.status}</strong></p>
            <p>正在加载：<strong>{usersQuery.isLoading ? '是' : '否'}</strong></p>
            <p>有错误：<strong>{usersQuery.isError ? '是' : '否'}</strong></p>
            <p>数据过时：<strong>{usersQuery.isStale ? '是' : '否'}</strong></p>
          </div>

          {usersQuery.isLoading && (
            <div className="loading">正在加载用户...</div>
          )}

          {usersQuery.isError && (
            <div className="error">
              错误：{usersQuery.error instanceof Error ? usersQuery.error.message : '未知错误'}
            </div>
          )}

          {usersQuery.isSuccess && (
            <div className="users-list">
              {usersQuery.data.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-actions">
                    <button onClick={() => setSelectedUserId(user.id)}>
                      查看详情
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteMutation.isPending}
                      className="danger-btn"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="button-group">
            <button
              onClick={() => usersQuery.refetch()}
              disabled={usersQuery.isFetching}
            >
              {usersQuery.isFetching ? '正在重新获取...' : '重新获取用户'}
            </button>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
            >
              使缓存失效
            </button>
          </div>
        </div>
      </section>

      {selectedUserId && (
        <section className="demo-box">
          <h2>用户详情</h2>
          <div className="demo-content">
            <div className="query-status">
              <p>用户 ID：<strong>{selectedUserId}</strong></p>
              <p>状态：<strong>{userQuery.status}</strong></p>
            </div>

            {userQuery.isLoading && (
              <div className="loading">正在加载用户详情...</div>
            )}

            {userQuery.isError && (
              <div className="error">
                错误：{userQuery.error instanceof Error ? userQuery.error.message : '未知错误'}
              </div>
            )}

            {userQuery.isSuccess && (
              <div className="user-details">
                <p><strong>姓名：</strong>{userQuery.data.name}</p>
                <p><strong>邮箱：</strong>{userQuery.data.email}</p>
                <p><strong>ID：</strong>{userQuery.data.id}</p>
              </div>
            )}

            <button onClick={() => setSelectedUserId(null)}>关闭</button>
          </div>
        </section>
      )}

      <section className="demo-box">
        <h2>主要特性</h2>
        <div className="demo-content">
          <div className="features-list">
            <div className="feature-item">
              <h4>🔄 自动缓存</h4>
              <p>数据被缓存并在组件间重用</p>
            </div>
            <div className="feature-item">
              <h4>⚡ 智能重新获取</h4>
              <p>在窗口聚焦、网络重连时自动重新获取</p>
            </div>
            <div className="feature-item">
              <h4>🎯 加载状态</h4>
              <p>内置加载、错误和成功状态</p>
            </div>
            <div className="feature-item">
              <h4>♻️ 过期即重验证</h4>
              <p>在后台获取新数据时显示缓存数据</p>
            </div>
            <div className="feature-item">
              <h4>🔀 变更操作</h4>
              <p>处理创建、更新、删除以及乐观更新</p>
            </div>
            <div className="feature-item">
              <h4>📦 缓存失效</h4>
              <p>自动使相关查询失效并重新获取</p>
            </div>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 关键要点：</h3>
        <ul>
          <li><strong>useQuery：</strong>获取和缓存数据，支持自动重新获取</li>
          <li><strong>useMutation：</strong>执行创建/更新/删除操作</li>
          <li><strong>queryKey：</strong>缓存数据的唯一标识符</li>
          <li><strong>staleTime：</strong>数据被认为是新鲜的时长</li>
          <li><strong>gcTime：</strong>未使用的数据在缓存中保留的时长（原 cacheTime）</li>
          <li><strong>enabled：</strong>有条件地启用/禁用查询</li>
          <li><strong>乐观更新：</strong>在服务器确认之前更新 UI</li>
        </ul>
      </section>
    </div>
  );
}
