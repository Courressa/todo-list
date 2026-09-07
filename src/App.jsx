import { useAuth } from "./contexts/AuthContext";
import TodosPage from "./features/Todos/TodosPage";
import Header from "./shared/Header";
import Logon from "./features/Logon";
import './App.css'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      {
        !isAuthenticated ?
        <Logon /> :
        <TodosPage  />
      }
    </div>
  )
}

export default App
