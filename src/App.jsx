import { useState } from "react";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todoTitle) => {
    const newTodo = {id: Date.now(), title: todoTitle };

    setTodoList(previous => [newTodo, ...previous]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
