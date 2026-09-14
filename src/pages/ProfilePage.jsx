import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page, LoadingRow, Spinner, Alert, EmptyState } from '../shared/Layout';
import { ListCard, List, Item, Paragraph } from '../shared/Layout';

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

                const params = new URLSearchParams({
                    sortBy: 'createdAt',
                    sortDirection: 'asc',
                    limit: 100,
                });

                const options = {
                    method: 'GET',
                    headers: { 'X-CSRF-TOKEN': token },
                    credentials: 'include',
                };

                const response = await fetch(`/api/tasks?${params}`, options);

                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }

                const data = await response.json();
                const todos = Array.isArray(data.tasks) ? data.tasks : [];

                if (!todos) {
                    throw new Error('Unexpected todo response');
                }

                const total = todos.length;
                const completed = todos.filter((todo) => todo.isCompleted).length;
                const active = total - completed;

                setTodoStats({ total, completed, active });
            } catch (err) {
                setError(`Error loading statistics.`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodoStats();
    }, [token]);

  return (
    <Page>
        <h2>Profile</h2>
        <ListCard>
            <h3>User Information</h3>
            <Paragraph>Name: {userName || 'Unknown user'}</Paragraph>
            <Paragraph>Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</Paragraph>
        </ListCard>

        <ListCard>
            <h3>Todo Statistics</h3>
            {isLoading && (
                <LoadingRow role="status">
                    <Spinner />
                    <span>Loading statistics...</span>
                </LoadingRow>
            )}
            {error && <Alert $tone="error"><p>{error}</p></Alert>}
            {!isLoading && !error && (
                todoStats.total === 0 ? (
                    <EmptyState>
                        <p>No todos yet.</p>
                    </EmptyState>
                ) : (
                    <List>
                        <Item>Total todos: {todoStats.total}</Item>
                        <Item>Completed todos: {todoStats.completed}</Item>
                        <Item>Active todos: {todoStats.active}</Item>
                        <Item>Completion: {Math.round((todoStats.completed / todoStats.total) * 100)}%</Item>
                    </List>
                )
            )}
        </ListCard>
    </Page>
  )
}
