import './App.scss'
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import LevelsAndGroups from './views/LevelsAndGroups';

function App() {
  const sidebarState = useSelector((state) => state.sidebar.isOpen)

  return (
    <div className="App">
      <Header/>
      <Sidebar isOpen={sidebarState}/>
      <div className='view-container'>
        <LevelsAndGroups/>
      </div>      
    </div>
  );
}

export default App;
