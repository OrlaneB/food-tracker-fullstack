import React, { useEffect, useState } from 'react'

import Homepage from './components/Homepage.jsx'
import AddMeal from './components/AddMeal.jsx'

import './App.css'

import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import SurveyLink from './components/layout/SurveyLink.jsx';
import ReportAnIssue from './components/ReportAnIssue.jsx';

import profileInfoContext from './context/profileInfo.jsx';
import LearnAboutProject from './components/LearnAboutProject.jsx'
import Layout from './components/layout/Layout.jsx'


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
          // console.log("profile info : ",response.data.profileInfo);
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
      
      <profileInfoContext.Provider value={{profileInfo,setProfileInfo}}>
        <Layout>
        <Routes>
          
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
          
          <Route path='/report-issue' element={<ReportAnIssue />} />
          <Route path="/about-project" element={<LearnAboutProject />} />
          
        </Routes>
        </Layout>
      </profileInfoContext.Provider>
      
      
    </>
  )
}

export default App
