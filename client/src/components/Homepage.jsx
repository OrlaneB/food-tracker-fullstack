/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Day from './Day'
import BarGraph from './BarGraph'
import MealCards from './MealCards'
import NavBar from "./NavBar"
import '../styles/Homepage.css'
import '../styles/NavBar.css'
import loginAuth from '../context/loginAuth'

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

  const {checkIfLoggedIn} = useContext(loginAuth);

  useEffect(()=>{
    checkIfLoggedIn();
  },[])

  let dummyData = [
    {name:"Protein", percentage:84},
    {name:"Vitamin A, RAE", percentage:24},
    {name:"Iron, Fe",percentage:56}];

  const [nutrientPercentage,setNutrientPercentage] = useState(dummyData);

      
      

  return (
    <div className='Homepage'>

      

      <Day dateObj={{day,setDay}}/>
      <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>
      <BarGraph objDay = {objDay} percentage={nutrientPercentage}/>
      <MealCards objDay = {objDay}/>
      <NavBar/>

    </div>
  )
}
