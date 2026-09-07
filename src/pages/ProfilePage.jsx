import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
    const { email, token } = useAuth();
    const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTodoStats = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError('');

                const response = await fetch('/api/tasks?limit=100', {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Unable to load todo statistics.');
                }

                const data = await response.json();
                const todos = data.tasks || [];
                const completed = todos.filter((todo) => todo.isCompleted).length;

                setStats({
                    total: todos.length,
                    completed,
                    active: todos.length - completed,
                });
            } catch {
                setError('Unable to load todo statistics. Please try again later.');
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
            <p>Name: {email || 'Unknown user'}</p>
        </section>

        <section>
            <h3>Todo Statistics</h3>
            {isLoading && <p>Loading statistics...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
            <ul>
                <li>Total todos: {stats.total}</li>
                <li>Completed todos: {stats.completed}</li>
                <li>Active todos: {stats.active}</li>
            </ul>
            )}
        </section>
    </div>
  )
}
