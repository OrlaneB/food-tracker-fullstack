/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import Profile from './components/Profile.jsx'
// import Profile from './components/Profile.jsx'
// import viteLogo from '/vite.svg'
import AddMeal from './components/AddMeal.jsx'
import './App.css'

function App() {
  // const [count, setCount] = useState(0) - don't need state for static version


  return (
    <> {/* component wrapper */}
      
      <Homepage />
      <Profile />
      <AddMeal />
      {/* {<Nav Bar /> */}
      
    </>
  )
}

export default App
