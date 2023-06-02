import { useState } from 'react';
import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import User from './pages/User';
import Proute from './components/Proute.jsx';
import Rroute from './components/Rroute.jsx';
import { useUserContext } from './UserContext';

function App() {
  const { token } = useUserContext();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Proute token={token}><HomePage /></Proute>}></Route>
            <Route path="/user/me" element={<Proute token={token}><Profile /></Proute>}></Route>
            <Route path="/user/:id" element={<Proute token={token}><User /></Proute>}></Route>
            <Route path="/login" element={<Rroute token={token}><LoginPage /></Rroute>}></Route> 
            <Route path="/register" element={<Rroute token={token}><RegisterPage /></Rroute>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
