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



export default function Homepage() {

  const {profileInfo} = useContext(profileInfoContext);
  const [day,setDay]=useState(new Date())


  const navigate = useNavigate();

  const [meals,setMeals]=useState();
  const [nutrientsByMeal,setNutrientsByMeal]=useState();
  const [noMealsForThisDate,setNoMealsForThisDate]=useState(false);
  const [chosenNutrients,setChosenNutrients]=useState([{name:"",amount:"",goal:""}]);


      
  async function getMeals() {
    if(!chosenNutrients[0].name) return;
    try {
      const result = await axios.get(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.user_id}`, {
        params: { date: `${day.getFullYear()}-${day.getMonth()+1<10? `0${day.getMonth()+1}`:day.getMonth()+1}-${day.getDate()<10? `0${day.getDate()}`:day.getDate()}` }
      });

	// console.log("result is : ",result);
      
      if(result.data.dataIngredients[0]){

        setNoMealsForThisDate(false)

        const {dataIngredients,dataNutrients} = result.data;

        let mealsID = new Set(dataIngredients.map(meal=>meal.meal_id));
        mealsID = Array.from(mealsID);

	// console.log("mealsID is : ",mealsID);
        // Create Meals
            let newMeals=[];

            for(let i =0; i<mealsID.length ; i++){
              let num = mealsID[i];

              let meal = {}
              dataIngredients.filter(m=>m.meal_id===num).map(ing=>{
                meal[ing.name]=ing.number_amount;
              })
              newMeals.push(meal);
            }

            setMeals(newMeals);

      
        //Create nutrients
          let newNutrientsByMeal = [];

          for (let index in mealsID) {
              let num = mealsID[index];
		// console.log("This item of mealsID is :",num);
		 console.log("chosenNutrients : ",chosenNutrients);
              if(chosenNutrients[0].name){
                let arrayChosenNutrient = chosenNutrients.map(nut=>nut.name);
    // console.log("ArrChosenNutrients : ",arrayChosenNutrient)
		 console.log("dataNutrients",dataNutrients);
                let meal = dataNutrients
                  .filter(n=>n.meal_id===num && arrayChosenNutrient.includes(n.nutrient_name))
                  .map(n=>{return {"nutrient_name":n.nutrient_name,"nutrient_number_amount":n.nutrient_number_amount} })
		// console.log("meal : ",meal);
                newNutrientsByMeal.push(meal)
              }
        }

        setNutrientsByMeal(newNutrientsByMeal);
      
      } else {
        setNoMealsForThisDate(true)
      }

    } catch (err) {
      console.log(err);
    }
  }



  useEffect(()=>{
    getMeals()
  },[day])

  useEffect(()=>{
    getMeals()
  },[chosenNutrients])

  useEffect(()=>{
    if(profileInfo) setChosenNutrients(profileInfo.chosenNutrients);
  },[profileInfo]);
      

  return (
    <div className='Homepage'>

      <mealsForOneDate.Provider value={{meals,nutrientsByMeal}}>
        
        <Day dateObj={{day,setDay}}/>

        <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>

        {!noMealsForThisDate && <>
            <BarGraph/>
            <MealCards />
        </>}

      </mealsForOneDate.Provider>

      {noMealsForThisDate && <div id='noMealWarning'>
          <p>There are no meals for this date.</p>
          <button onClick={()=>navigate("/add-meal")} className='textButton'>Add one here</button>
      </div>}

    </div>
  )
}
