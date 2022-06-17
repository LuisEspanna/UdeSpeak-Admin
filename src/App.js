import './App.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Restore from './pages/Restore';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/restore' element={<Restore/>}/>
      </Routes>
    </Router>
  );
}

export default App;
