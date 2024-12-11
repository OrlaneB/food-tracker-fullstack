/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Day from './Day'
import BarGraph from './BarGraph'
import MealCards from './MealCards'
import '../styles/Homepage.css'
import axios from 'axios'

import mealsForOneDate from '../context/mealsForOneDate'
import { useNavigate } from 'react-router-dom'
import profileInfoContext from '../context/profileInfo'

import Meal from '../utilities/classes/mealClass'



export default function Homepage() {

  const {profileInfo} = useContext(profileInfoContext);
  const [day,setDay]=useState(new Date())


  const navigate = useNavigate();

  const [meals,setMeals]=useState();

  // const [nutrients,setNutrients]=useState();


  async function getMeals(){

    try {

      const date = new Date(day).toLocaleDateString('en-CA');

      const response = await axios.get(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.id}/${date}`);
	
      if(response.status===200){
        console.log(response.data.message);

        const mealsResponse = response.data.meals;
        let meals = [];

        mealsResponse.forEach((m,index)=>{
          const meal = new Meal(m,response.data.nutrients[index]);
          meals.push(meal);
        })

        setMeals(meals);
        // setMeals(response.data.meals);
        // setNutrients(response.data.nutrients);
        //console.log("meals : ",response.data.meals)
        //console.log("nutrients : ",response.data.nutrients)
      }


    } catch(err) {
      console.log(err);
    }
  }


  useEffect(()=>{
    if(profileInfo.id) getMeals()
  },[day,profileInfo.id])

      

  return (
    <div className='Homepage'>

      <mealsForOneDate.Provider value={{meals,setMeals,day}}>
        
        <Day dateObj={{day,setDay}}/>

        <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>

        {meals && meals.length!==0 && <>
            <BarGraph/> 
            <MealCards />
        </>}

      </mealsForOneDate.Provider>

      {meals && meals.length===0 && <div id='noMealWarning'>
          <p>There are no meals for this date.</p>
          <button onClick={()=>navigate("/add-meal")} className='textButton'>Add one here</button>
      </div>}

    </div>
  )
}
