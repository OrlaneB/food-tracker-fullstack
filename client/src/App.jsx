/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import NavBar from './components/NavBar.jsx';
import Profile from './components/Profile.jsx'
import AddMeal from './components/AddMeal.jsx'
import './App.css'
import axios from 'axios'



function App() {
  // const [count, setCount] = useState(0) - don't need state for static version

  // set default state to homepage
  const [view, setView] = useState("Homepage");

  const authKey = process.env.API_KEY;

  function changeView(viewName){
    setView(viewName);
  }

  axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {

    params:{
      query: 'cheddar cheese',
      dataType : "Survey (FNDDS)"
    }

    }).then(function(response){console.log(response.data[0])})
      .catch(function(error){console.log(error.error)}
  );


  return (
    <> {/* component wrapper */}
      
      {view === "Homepage" && <Homepage />}
      {view === "Profile" && <Profile />}
      {view === "AddMeal" && <AddMeal />}
      <NavBar changeView={changeView}/>
      
    </>
  )
}

export default App
