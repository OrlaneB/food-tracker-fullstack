/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Day from './Day'
import BarGraph from './BarGraph'
import MealCards from './MealCards'
import '../styles/Homepage.css'
import '../styles/NavBar.css'

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

/* Calculate the nutrient in a method inside the meal object
 {proteinCopy+=item.numberAmount}

*/
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

// Meals for the day
let objDay = {
  meals : [objMeal1, objMeal2, objMeal3],
  protein : '37',
  carbs : '35',
  fat : "21"
}

export default function Homepage() {
  return (
    <div className='Homepage'>
      <Day />
      <BarGraph objDay = {objDay}/>
      <MealCards objDay = {objDay}/>
    </div>
  )
}
