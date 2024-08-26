/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Day from './Day'
import BarGraph from './BarGraph'
import MealCards from './MealCards'
import NavBar from "./NavBar"
import '../styles/Homepage.css'
import '../styles/NavBar.css'
import axios from 'axios'

import mealsForOneDate from '../context/mealsForOneDate'
import { useNavigate } from 'react-router-dom'



export default function Homepage() {

  const [day,setDay]=useState(new Date())

  const navigate = useNavigate();

  //"2024-08-01"
  const [meals,setMeals]=useState();
  const [nutrientsByMeal,setNutrientsByMeal]=useState();
  const [noMealsForThisDate,setNoMealsForThisDate]=useState(false);

  //Will come from AuthContext
  const isLoggedIn = true;
  const chosenNutrients=["Protein","Vitamin A, RAE","Iron, Fe"]

  let dummyData = [
    {name:"", percentage:50},
    {name:"", percentage:50},
    {name:"",percentage:50}];

  const [nutrientPercentage,setNutrientPercentage] = useState(dummyData);

      
  async function getMeals() {
    try {
      const result = await axios.get("http://localhost:5000/api/meals/1", {
        params: { date: `${day.getFullYear()}-${day.getMonth()+1<10? `0${day.getMonth()+1}`:day.getMonth()+1}-${day.getDate()<10? `0${day.getDate()}`:day.getDate()}` }
      });
      
      if(result.data.dataIngredients[0]){

        setNoMealsForThisDate(false)

      const {dataIngredients,dataNutrients} = result.data;


      let mealsID = new Set(dataIngredients.map(meal=>meal.meal_id));
      mealsID = Array.from(mealsID);

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
          
          let meal = dataNutrients.filter(n=>n.meal_id===num && chosenNutrients.includes(n.nutrient_name)).map(n=>{return {"nutrient_name":n.nutrient_name,"nutrient_number_amount":n.nutrient_number_amount} })

          newNutrientsByMeal.push(meal)
        
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


      

  return (
    <div className='Homepage'>

      
    <mealsForOneDate.Provider value={{meals,nutrientsByMeal}}>
      <Day dateObj={{day,setDay}}/>
      <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>
      {!noMealsForThisDate &&
          <>
            <BarGraph percentage={nutrientPercentage}/>
            <MealCards />
          </>
      }
      
    </mealsForOneDate.Provider>

    {noMealsForThisDate &&
      <div id='noMealWarning'>
        <p>There are no meals for this date.</p>
        <button onClick={()=>navigate("/add-meal")}>Add one here</button>
      </div>
    }
      <NavBar/>
    

    </div>
  )
}
