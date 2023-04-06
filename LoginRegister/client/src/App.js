import React from 'react'; 
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'

                                      
        

function App() {
  let isLoggedIn = localStorage.getItem('userToken');
 console.log(isLoggedIn)

  return ( 
    <Router>
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route  path="/register" element={<RegisterPage />} />
            <Route  path="/dashboard"  element={<Dashboard />} />

        </Routes>
        
</Router>
    
    // <LoginPage />
  );
}

export default App;
