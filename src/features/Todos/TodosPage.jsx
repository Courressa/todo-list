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
                setError(err);
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

    const completeTodo = (id) => {
        setTodoList(todoList.map(todo => {
            return todo.id === id ? { ...todo, isCompleted: true } : todo;
        }));
    };

    const updateTodo = (editedTodo) => {
        const updatedTodos = todoList.map(todo => {
            if (todo.id === editedTodo.id) {
                return {...editedTodo};
            }

            return todo;
        });

        setTodoList(updatedTodos);
    };
    return (
        <div>
            <TodoForm onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </div>
    )
}
