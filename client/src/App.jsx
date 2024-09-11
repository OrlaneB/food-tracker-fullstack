/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import NavBar from './components/NavBar.jsx';
// import Profile from './components/Profile.jsx'
import AddMeal from './components/AddMeal.jsx'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

import loginAuth from './context/loginAuth.jsx';
import Profile from './components/Profile.jsx';


function App() {
  let navigate = useNavigate();
  // const [count, setCount] = useState(0) - don't need state for static version

  // set default state to homepage
  // const [view, setView] = useState("Homepage");

  const authKey = import.meta.env.VITE_APP_API_KEY;

  function checkIfLoggedIn(){
    console.log(`User is logged in : ${loginAuthValue.isLoggedIn}`);
    if(!loginAuthValue.isLoggedIn) navigate("/login");
  }


  const [loginAuthValue,setLoginAuthValue] = useState({
    user_id:null,
    isLoggedIn:false,
  })


  return (
    <> {/* component wrapper */}

    <header>
      <h2 onClick={()=>navigate("/")}>Foodtracker</h2>

      <nav>
        <button className='roundButton' onClick={()=>navigate("/add-meal")}>
          <i className="fi fi-rr-add"></i>
        </button>
        <button className='roundButton' onClick={()=> navigate("/profile")}>
          <i className="fi fi-rr-user"></i>
        </button>
      </nav>
      
    </header>
      
    < loginAuth.Provider value={{loginAuthValue, setLoginAuthValue, checkIfLoggedIn}}>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path="/navbar" element={<NavBar/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      {/* </Router> */}
      </loginAuth.Provider>
      


      
    </>
  )
}

export default App
