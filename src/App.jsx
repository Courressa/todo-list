import { useState } from "react";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import './App.css'

const todos = [
  {id: 1, title: "wash the car"},
  {id: 2, title: "fold laundry"},
  {id: 3, title: "eat strawberry cake"}
];

function App() {
  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
