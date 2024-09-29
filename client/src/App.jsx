/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Homepage from './components/Homepage.jsx'
// import Profile from './components/Profile.jsx'
import AddMeal from './components/AddMeal.jsx'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import SurveyLink from './components/SurveyLink.jsx'

import loginAuth from './context/loginAuth.jsx';
import profileInfoContext from './context/profileInfo.jsx';


function App() {
  let navigate = useNavigate();

  const [profileInfo,setProfileInfo] = useState();
  const [loginAuthValue,setLoginAuthValue] = useState({
    user_id:null,
    isLoggedIn:false,
  })

  const authKey = import.meta.env.VITE_APP_API_KEY;



  async function getProfileInfo(user_id){

    // console.log(user_id);

    if(user_id){
        try {

            const result = await axios.get(`http://localhost:5000/api/profiles/${user_id}`);

            let profileObj = result.data.resObj;

            profileObj.chosenNutrients = 
              [{name: profileObj.nutrient_1_name, amount:profileObj.nutrient_1_amount, goal:profileObj.nutrient_1_goal},
              {name: profileObj.nutrient_2_name, amount:profileObj.nutrient_2_amount, goal:profileObj.nutrient_2_goal},
              {name: profileObj.nutrient_3_name, amount:profileObj.nutrient_3_amount, goal:profileObj.nutrient_3_goal}];

            setProfileInfo(profileObj);
            // console.log(profileObj);

        }
        catch(err){
            console.log(err);
        }
    }
        
    
  }


  async function checkToken(){
    let token = localStorage.getItem("token");

    if(token){
      try{
        let result = await axios.post("http://localhost:5000/api/users/token",{
          token
        })

        // console.log(result)
        if(result.statusText==="OK") {
          loginAuthValue.user_id=result.data;
          loginAuthValue.isLoggedIn=true;
          getProfileInfo(result.data)
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

  useEffect(()=>{
    if(loginAuthValue.user_id) getProfileInfo(loginAuthValue.user_id)
  },[loginAuthValue])


  


  return (
    <> 

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
      <profileInfoContext.Provider value={{profileInfo,setProfileInfo}}>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </profileInfoContext.Provider>
    </loginAuth.Provider>
      

    <SurveyLink />
      
    </>
  )
}

export default App
