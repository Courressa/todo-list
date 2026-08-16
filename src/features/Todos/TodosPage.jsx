import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";

export default function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setIsTodoListLoading(true);
                const params = new URLSearchParams({
                    limit: 100,
                });

                const response = await fetch(`/api/tasks?${params}`, {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                });

                if (response.status === 401) {
                    throw new Error("unauthorized")
                } else if (!response.ok) {
                    throw new Error("There was an issue with you're request")
                }

                const data = await response.json();
                setTodoList(data.tasks);
            } catch (err) {
                setError(err.message || "There was an issue with you're request");
            } finally {
                setIsTodoListLoading(false);
            }
        }

        if (token) {
            fetchTodos();
        }
    }, [token]);

    const addTodo = async (todoTitle) => {
        // Temporary todo
        const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false };

        // Obtimistically update the UI immediately
        setTodoList(previous => [...previous, newTodo]);

        try {
            const response = await fetch(`/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: todoTitle,
                    isCompleted: false
                })
            });

            if (!response.ok) {
                throw new Error("Failed to add todo");
            }

            // On success: replace the temporary todo with the real todo from the server response
            const realTodo = await response.json();

            setTodoList(previous =>
                previous.map(todo => 
                    todo.id === newTodo.id ? realTodo : todo
                )
            );
        } catch (err) {
            // On failure: remove the failed todo from the list and set an error message
            setTodoList(previous =>
                previous.filter(todo => todo.id !== newTodo.id)
            );
            setError(err.message || "There was an issue adding the todo");
        }
        
    };

    const completeTodo = async (id) => {
        // Store the original todo before making changes (for potential rollback)
        const originalTodo = todoList.find(todo => todo.id === id);

        // Optimistically update the todo as completed in state
        setTodoList(previous => 
            previous.map(todo =>
                todo.id === id ? { ...todo, isCompleted: true } : todo
            )
        );

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    isCompleted: true
                })
            });

            if (!response.ok) {
                throw new Error("Failed to mark as completed");
            }
        } catch (err) {
            // On failure: rollback to the original todo and set error message
            setTodoList(previous => 
                previous.map(todo => 
                    todo.id === id ? originalTodo : todo
                )
            );
            setError(err.message || "There was an issue marking the todo as completed");
        }
        
    };

    const updateTodo = async (editedTodo) => {
        // Store the original todo for rollback
        const originalTodo = todoList.find(todo => todo.id === editedTodo.id);

        // Optimistically apply the edited todo to state
        setTodoList(previous => 
            previous.map(todo => {
                if (todo.id === editedTodo.id) {
                    return {...editedTodo};
                }

                return todo;
            })
        );

        try {
            const response = await fetch(`/api/tasks/${editedTodo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: editedTodo.title,
                    isCompleted: editedTodo.isCompleted,
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update todo");
            }
        } catch (err) {
            // On failure: rollback to the original todo and set error message
            setTodoList(previous => 
                previous.map(todo => 
                    todo.id === editedTodo.id ? originalTodo : todo
                )
            );
            setError(err.message || "There was an issue with updating the todo");
        }
    };

    return (
        <div>
            {error && (
                <div>
                    <p>{typeof error === "string" ? error : error.message}</p>
                    <button onClick={() => setError("")}>Clear Error</button>
                </div>
            )}
            {isTodoListLoading && <p>Loading...</p>}
            <TodoForm onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </div>
    )
}
