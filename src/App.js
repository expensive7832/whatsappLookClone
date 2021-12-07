import React from 'react';
import './style.css';
import Home from './pages/Home';
import Login from './components/Login';
import {useStateValue} from './Redux/Stateprovider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatTab from './components/ChatTab';

function App() {

 
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chatTab/:roomId' element={<ChatTab/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
