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

// Each meal
let objMeal1 = {
  ingredients : [
    {ingredientName : "rice", numberAmount : "1", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "tomato", numberAmount : "3", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "cheese", numberAmount : "30", measurement : "g", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "apple", numberAmount : "150", measurement : "g", protein : "x g", carbs : "y g", fat : "z g" },
    //...
  ],
  protein : '10g',
  carbs : '15g',
  fat : "1g"
}
let objMeal2 = {
  ingredients : [
    {ingredientName : "rice", numberAmount : "1", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" }],
  protein : '17g',
  carbs : '15g',
  fat : "12g"
}
let objMeal3 = {
  ingredients : [
    {ingredientName : "rice", numberAmount : "1", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" }],
  protein : '10g',
  carbs : '5g',
  fat : "8g"
}
let objDay = {
  meals : [objMeal1, objMeal2, objMeal3],
  protein : '37',
  carbs : '35',
  fat : "21"
}




export default function Homepage() {

  const [day,setDay]=useState(new Date())
  const [meals,setMeals]=useState();
  const [nutrientsByMeal,setNutrientsByMeal]=useState();

  //Will come from AuthContext
  const isLoggedIn = true;
  const chosenNutrients=["Protein","Vitamin A, RAE","Iron, Fe"]

  let dummyData = [
    {name:"Protein", percentage:84},
    {name:"Vitamin A, RAE", percentage:24},
    {name:"Iron, Fe",percentage:56}];

  const [nutrientPercentage,setNutrientPercentage] = useState(dummyData);

      
  async function getMeals() {
    try {
      const result = await axios.get("http://localhost:5000/api/meals/1", {
        params: { date: "2024-08-01" }
      });

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

      // for (let index in chosenNutrients) {
      //   let nut = chosenNutrients[index];
      //   const sum = dataNutrients
      //     .filter(n => n.nutrient_name === nut)
      //     // .reduce((accumulator, nutObj) => 
      //     //   accumulator + nutObj.nutrient_number_amount, 0); // Provide 0 as the initial value
      
      //   console.log(sum);
      // }
      
      

    } catch (err) {
      console.log(err);
    }
  }



  useEffect(()=>{
    getMeals()
  },[])
      

  return (
    <div className='Homepage'>

      
    <mealsForOneDate.Provider value={{meals,nutrientsByMeal}}>
      <Day dateObj={{day,setDay}}/>
      <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>
      <BarGraph objDay = {objDay} percentage={nutrientPercentage}/>
      <MealCards objDay = {objDay}/>
    </mealsForOneDate.Provider>
      <NavBar/>
    

    </div>
  )
}
