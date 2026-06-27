import './App.css'

function App() {
  const todoList = [
    {id: 1, title: "wash the car"},
    {id: 2, title: "fold laundry"},
    {id: 3, title: "eat strawberry cake"}
  ];

  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
