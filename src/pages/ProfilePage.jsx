import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
    const { userName, token, isAuthenticated } = useAuth();
    const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTodoStats = async () => {
            if (!token) {
                setTodoStats({ total: 0, completed: 0, active: 0 });
                setError('');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError('');

                const options = {
                    method: 'GET',
                    headers: { 'X-CSRF-TOKEN': token },
                    credentials: 'include',
                };

                const response = await fetch('/api/tasks', options);

                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }

                const data = await response.json();
                const todos = Array.isArray(data)
                    ? data
                    : data && Array.isArray(data.tasks)
                        ? data.tasks
                        : null;

                if (!todos) {
                    throw new Error('Unexpected todo response');
                }

                // Calculate statistics
                const total = todos.length;
                const completed = todos.filter((todo) => todo.isCompleted).length;
                const active = total - completed;

                setTodoStats({ total, completed, active });
            } catch (err) {
                setError(`Error loading statistics: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodoStats();
    }, [token]);

  return (
    <div>
        <h2>Profile</h2>
        <section>
            <h3>User Information</h3>
            <p>Name: {userName || 'Unknown user'}</p>
            <p>Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
        </section>

        <section>
            <h3>Todo Statistics</h3>
            {isLoading && <p>Loading statistics...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
            <ul>
                <li>Total todos: {todoStats.total}</li>
                <li>Completed todos: {todoStats.completed}</li>
                <li>Active todos: {todoStats.active}</li>
                <li>Completion: {todoStats.total > 0 ? Math.round((todoStats.completed / todoStats.total) * 100) : 0}%</li>
            </ul>
            )}
        </section>
    </div>
  )
}
