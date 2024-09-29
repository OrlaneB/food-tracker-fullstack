/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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

  

  const authKey = import.meta.env.VITE_APP_API_KEY;

  async function checkToken(){
    let token = localStorage.getItem("token");

    if(token){
      try{
        let result = await axios.post("http://localhost:5000/api/users/token",{
          token
        })

        console.log(result)
        if(result.statusText==="OK") {
          loginAuthValue.user_id=result.data;
          loginAuthValue.isLoggedIn=true;
        } else {
          console.log("Token is uncorrect")
          navigate("/login");
        }

      }
      catch(err){
        console.log(err);
      }
    } else {
      console.log("There's no token");
      navigate("/login");
    }
  }

  useEffect(()=>{
    checkToken()
  },[])

  // function checkIfLoggedIn(){
  //   console.log(`User is logged in : ${loginAuthValue.isLoggedIn}`);
  //   if(!loginAuthValue.isLoggedIn) navigate("/login");
  // }


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
      
    < loginAuth.Provider value={{loginAuthValue, setLoginAuthValue}}>
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
