import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Record from './components/Record';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  const getUser = (user) => {setUser(user)}



  return (
    <div className="App" style={{width: "%100", height: "%100"}}>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home user = { user }/>}/>
            <Route path='/' exact element={<Login getUser = { getUser }/>}/>
            <Route path='/record' exact element={<Record/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
