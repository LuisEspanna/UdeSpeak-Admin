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
import { useSelector } from 'react-redux';
import NotFound404 from './pages/NotFound404/NotFound404';
import FirstSetup from './pages/FirstSetup/FirstSetup';

function App() {
  const auth = useSelector((state) => state.user?.isLogged);

  return (
    <Router>
      <Routes>
        <Route path='/' element={ auth ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={ !auth ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>
        <Route path='/restore' element={!auth ? <Restore/> : <Navigate to='/'/>}/>
        <Route path='/dashboard' element={ auth ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path='/dashboard/:view' element={ auth ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path='/first-setup' element={ auth ? <FirstSetup/> : <Navigate to='/login'/>}/>
        <Route path='*' element={<NotFound404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
