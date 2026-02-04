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
      <h1>TanStack Query Demo</h1>
      <p className="description">
        TanStack Query (formerly React Query) provides powerful data fetching with built-in caching, loading states, error handling, and more.
      </p>

      <section className="demo-box">
        <h2>Users List</h2>
        <div className="demo-content">
          <div className="query-status">
            <p>Status: <strong>{usersQuery.status}</strong></p>
            <p>Is Loading: <strong>{usersQuery.isLoading ? 'Yes' : 'No'}</strong></p>
            <p>Is Error: <strong>{usersQuery.isError ? 'Yes' : 'No'}</strong></p>
            <p>Is Stale: <strong>{usersQuery.isStale ? 'Yes' : 'No'}</strong></p>
          </div>

          {usersQuery.isLoading && (
            <div className="loading">Loading users...</div>
          )}

          {usersQuery.isError && (
            <div className="error">
              Error: {usersQuery.error instanceof Error ? usersQuery.error.message : 'Unknown error'}
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
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteMutation.isPending}
                      className="danger-btn"
                    >
                      Delete
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
              {usersQuery.isFetching ? 'Refetching...' : 'Refetch Users'}
            </button>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
            >
              Invalidate Cache
            </button>
          </div>
        </div>
      </section>

      {selectedUserId && (
        <section className="demo-box">
          <h2>User Details</h2>
          <div className="demo-content">
            <div className="query-status">
              <p>User ID: <strong>{selectedUserId}</strong></p>
              <p>Status: <strong>{userQuery.status}</strong></p>
            </div>

            {userQuery.isLoading && (
              <div className="loading">Loading user details...</div>
            )}

            {userQuery.isError && (
              <div className="error">
                Error: {userQuery.error instanceof Error ? userQuery.error.message : 'Unknown error'}
              </div>
            )}

            {userQuery.isSuccess && (
              <div className="user-details">
                <p><strong>Name:</strong> {userQuery.data.name}</p>
                <p><strong>Email:</strong> {userQuery.data.email}</p>
                <p><strong>ID:</strong> {userQuery.data.id}</p>
              </div>
            )}

            <button onClick={() => setSelectedUserId(null)}>Close</button>
          </div>
        </section>
      )}

      <section className="demo-box">
        <h2>Key Features</h2>
        <div className="demo-content">
          <div className="features-list">
            <div className="feature-item">
              <h4>🔄 Automatic Caching</h4>
              <p>Data is cached and reused across components</p>
            </div>
            <div className="feature-item">
              <h4>⚡ Smart Refetching</h4>
              <p>Automatically refetch on window focus, network reconnect</p>
            </div>
            <div className="feature-item">
              <h4>🎯 Loading States</h4>
              <p>Built-in loading, error, and success states</p>
            </div>
            <div className="feature-item">
              <h4>♻️ Stale While Revalidate</h4>
              <p>Show cached data while fetching fresh data in background</p>
            </div>
            <div className="feature-item">
              <h4>🔀 Mutations</h4>
              <p>Handle create, update, delete with optimistic updates</p>
            </div>
            <div className="feature-item">
              <h4>📦 Cache Invalidation</h4>
              <p>Automatically invalidate and refetch related queries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="notes">
        <h3>📝 Key Points:</h3>
        <ul>
          <li><strong>useQuery:</strong> Fetch and cache data with automatic refetching</li>
          <li><strong>useMutation:</strong> Perform create/update/delete operations</li>
          <li><strong>queryKey:</strong> Unique identifier for cached data</li>
          <li><strong>staleTime:</strong> How long data is considered fresh</li>
          <li><strong>gcTime:</strong> How long unused data stays in cache (formerly cacheTime)</li>
          <li><strong>enabled:</strong> Conditionally enable/disable queries</li>
          <li><strong>Optimistic updates:</strong> Update UI before server confirms</li>
        </ul>
      </section>
    </div>
  );
}
