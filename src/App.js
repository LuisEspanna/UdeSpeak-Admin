import './App.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Restore from './pages/Restore';
import { useSelector } from 'react-redux'

function App() {
  const auth = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path='/' element={ auth ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={ !auth ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>
        <Route path='/restore' element={!auth ? <Restore/> : <Navigate to='/'/>}/>
      </Routes>
    </Router>
  );
}

export default App;
