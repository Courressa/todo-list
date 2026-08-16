import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";

export default function TodosPage() {
    const [todoList, setTodoList] = useState([]);

    const addTodo = (todoTitle) => {
        const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false };

        setTodoList(previous => [...previous, newTodo]);
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
