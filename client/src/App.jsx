/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import NavBar from './components/NavBar.jsx';
import Profile from './components/Profile.jsx'
import AddMeal from './components/AddMeal.jsx'
import './App.css'

function App() {
  // const [count, setCount] = useState(0) - don't need state for static version

  // set default state to homepage
  const [view, setView] = useState("Homepage");

  function changeView(viewName){
    setView(viewName);
  }


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
