import { useState, useEffect, useCallback, useReducer } from "react";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../reducers/todoReducer';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";
import SortBy from "../../shared/SortBy";
import useDebounce from "../../utils/useDebounce";
import FilterInput from "../../shared/FilterInput";

export default function TodosPage({ token }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const {
        todoList,
        error,
        filterError,
        isTodoListLoading,
        sortBy,
        sortDirection,
        filterTerm,
        dataVersion,
    } = state;
    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); };

    const invalidateCache = useCallback(() => {
        setDataVersion(prev => prev + 1);
    }, []);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                dispatch({ type: TODO_ACTIONS.FETCH_START });
                const paramsObject = {
                    sortBy,
                    sortDirection,
                    limit: 100
                };

                if (debouncedFilterTerm) {
                    paramsObject.find = debouncedFilterTerm;
                }
                const params = new URLSearchParams(paramsObject);

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
                dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: data.tasks });
            } catch (error) {
                dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: error.message });
            }
        }

        if (token) {
            fetchTodos();
        }
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);

    const addTodo = async (todoTitle) => {
        // Temporary todo
        const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false };

        // Obtimistically update the UI immediately
        dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: newTodo });

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

            dispatch({ type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload: {newTodoId: newTodo.id, realTodo} });
            invalidateCache();
        } catch (err) {
            // On failure: remove the failed todo from the list and set an error message
            dispatch({ type: TODO_ACTIONS.ADD_TODO_ERROR, payload: {newTodoId: newTodo.id, message: err.message} });
        }
        
    };

    const completeTodo = async (id) => {
        setError("");
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
            invalidateCache();
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
        setError("");
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
            invalidateCache();
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
            {filterError && (
                <div>
                    <p>{typeof filterError === "string" ? filterError : filterError.message}</p>
                    <button onClick={() => setFilterError("")}>Clear Filter Error</button>
                    <button onClick={() => {
                        setFilterTerm("")
                        setSortBy('createdAt')
                        setSortDirection('desc')
                        setFilterError("")
                    }}
                    >
                        Reset Filters
                    </button>
                </div>
            )}
            <SortBy
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortByChange={setSortBy}
                onSortDirectionChange={setSortDirection}
            />
            <FilterInput
                filterTerm={filterTerm}
                onFilterChange={handleFilterChange}
            />
            <TodoForm onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
            />
        </div>
    )
}
