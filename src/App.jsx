import { useState } from "react";
import TodosPage from "./features/Todos/TodosPage";
import Header from "./shared/Header";
import Logon from "./features/Logon";
import './App.css'

function App() {
  const [email , setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <div>
      <Header token={token} onSetEmail={setEmail} onSetToken={setToken}/>
      {
        !token ?
        <Logon
          onSetEmail={setEmail}
          onSetToken={setToken}
        /> :
        <TodosPage token={token} />
      }
    </div>
  )
}

export default App
