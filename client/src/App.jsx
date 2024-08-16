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



function App() {
  // const [count, setCount] = useState(0) - don't need state for static version

  // set default state to homepage
  // const [view, setView] = useState("Homepage");

  const authKey = import.meta.env.VITE_APP_API_KEY;

  // function changeView(viewName){
  //   setView(viewName);
  // }

  // const ingredients = ['milk', 'bread', 'cheese'];

  // const requests = ingredients.map(ingredient =>
  //   axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {
  //     params: {
  //       query: ingredient,
  //       dataType: "Survey (FNDDS)",
  //       pageSize: 1, // Limite le nombre de résultats par page si nécessaire
  //     },
  //   })
  // );
  
  // axios.all(requests)
  //   .then(axios.spread((...responses) => {
  //     let mealNutrients = [];

<<<<<<< HEAD
    }).then(function(response){
      // console.log(response.data[0])
    })
      .catch(function(error){console.log(error.error)}
  );
=======
  //     responses.forEach(response=>{
  //       mealNutrients.push(response.data[0].foodNutrients);
  //     })

  //     console.log(mealNutrients)
  //   }))
  //   .catch(errors => {
  //     console.log(errors); // Gère les erreurs
  //   });

  // axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {

  //   params:{
  //     query: 'milk',
  //     dataType : "Survey (FNDDS)"
  //   }

  //   }).then(function(response){console.log(response.data[0])})
  //     .catch(function(error){console.log(error.error)}
  // );
>>>>>>> main


  return (
    <> {/* component wrapper */}
      
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/add-meal" element={<AddMeal />}/>
          <Route path="/navbar" element={<NavBar/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      
      {/* {view === "Homepage" && <Homepage />}
      {view === "Profile" && <Profile />}
      {view === "AddMeal" && <AddMeal />} */}
     
      
    </>
  )
}

export default App
