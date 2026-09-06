import './App.css';
import { Routes, Route } from 'react-router';
import TodosPage from "./pages/TodosPage";
import Logon from "./features/Logon";
import Header from './shared/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Routes will go here */}
      </Routes>
    </>
  );
}

export default App;
