import React, { useEffect, useState } from 'react'

import Homepage from './components/Homepage.jsx'
import AddMeal from './components/AddMeal.jsx'

import './App.css'

import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import SurveyLink from './components/SurveyLink.jsx';
import ReportAnIssue from './components/ReportAnIssue.jsx';

import profileInfoContext from './context/profileInfo.jsx';


function App() {
  let navigate = useNavigate();

  const [profileInfo,setProfileInfo] = useState({
    id:null,
    username:"",
    chosenNutrients:null
  });


  async function checkToken(){
    const token = localStorage.getItem("token");

    if(token){
      try{

        const response = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/token`,{
          token
        });

        if(response.statusText==="OK") {
          console.log(response.data.message);
		//console.log(response.data);
          setProfileInfo(response.data.profileInfo);
        } else {
          console.log("Token is uncorrect")
          navigate("/login");
        }

      }
      catch(err){
        console.log(err);
        navigate("/login");
      }
    } else {
      console.log("There's no token");
      navigate("/login");
    }
  }

  useEffect(()=>{
    checkToken()
  },[])



  return (
    <> 

    <header>
      <h2 onClick={()=>navigate("/")}>Food Pulse</h2>

      <nav>
        <button className='roundButton' onClick={()=>navigate("/add-meal")}>
          <i className="fi fi-rr-add"></i>
        </button>
        <button className='roundButton' onClick={()=> navigate("/profile")}>
          <i className="fi fi-rr-user"></i>
        </button>
      </nav>
      
    </header>
      
      <profileInfoContext.Provider value={{profileInfo,setProfileInfo}}>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/report-issue' element={<ReportAnIssue />} />
        </Routes>
      </profileInfoContext.Provider>
      

    <SurveyLink />
      
    </>
  )
}

export default App
