import { useState } from "react";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todoTitle) => {
    const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false };

    setTodoList(previous => [newTodo, ...previous]);
  }

  const completeTodo = (id) => {
    setTodoList(todoList.map(todo => {
      return todo.id === id ? { ...todo, isCompleted: true } : todo;
    }));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  )
}

export default App
