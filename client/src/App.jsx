/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import NavBar from './components/NavBar.jsx';
// import Profile from './components/Profile.jsx'
import AddMeal from './components/AddMeal.jsx'
import ProfilePage from './components/ProfilePage.jsx';
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

import loginAuth from './context/loginAuth.jsx';


function App() {
  // const [count, setCount] = useState(0) - don't need state for static version

  // set default state to homepage
  // const [view, setView] = useState("Homepage");

  const authKey = import.meta.env.VITE_APP_API_KEY;




  const [loginAuthValue,setLoginAuthValue] = useState({
    user_id:null,
    isLoggedIn:false,
  })


  return (
    <> {/* component wrapper */}
      
    < loginAuth.Provider value={{loginAuthValue, setLoginAuthValue}}>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path="/navbar" element={<NavBar/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      {/* </Router> */}
      </loginAuth.Provider>
      
      {/* {view === "Homepage" && <Homepage />}
      {view === "Profile" && <Profile />}
      {view === "AddMeal" && <AddMeal />} */}

      
    </>
  )
}

export default App
