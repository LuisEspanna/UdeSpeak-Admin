import './App.scss'
import Header from './components/Header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useSelector } from 'react-redux';

function App() {
  const sidebarState = useSelector((state) => state.sidebar.isOpen)

  console.log(sidebarState)

  return (
    <div className="App">
      <Header/>
      <Sidebar isOpen={sidebarState}/>
      <div className='view-container'>

      </div>      
    </div>
  );
}

export default App;
