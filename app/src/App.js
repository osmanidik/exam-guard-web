import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Record from './components/Record';

function App() {
  return (
    <div className="App" style={{width: "%100", height: "%100"}}>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/' exact element={<Login/>}/>
            <Route path='/record' exact element={<Record/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
