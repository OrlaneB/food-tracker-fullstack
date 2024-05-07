/* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
import '../styles/Homepage.css'
import '../styles/Day.css'
import '../styles/Meals.css'
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

function Day() {
    // Declare today's date
    const today = new Date();// throwing an error "Maximum callstack exceeded"
   
    return (
        <div className='Day'>
            <button>←</button>
            <p>{today.toDateString()}</p>
            <button>→</button>
        </div>    
    )                                
}

function Results() {
    //const [test,setTest] = useState({});
    // const [count,setCount] = useState([1,2,3])
    // copy dummy data
   const objDay1= objDay
    const {protein, carbs, fat} = objDay1;

    return (
      <div className = "Results">
        <p>{protein}</p> 
        <p>{carbs}</p>
        <p>{fat}</p>
      </div>
    )
}
function Meals() {
 // copy dummy data
 const arrMeals = objDay.meals;

 //render meal information
 return (
  <div className='Meals'>
      {/* {console.log(arrMeals)} */}
      {arrMeals.map((meal, index) =>(
        // console.log(meal);
        // console.log(index);
        <div key={index} className='mealContainer'>
          <ul>
            {/* {console.log(meal.ingredients[0].ingredientName)} */}
            {meal.ingredients.map((ingredient, index2) => (
              <li key={index2}>• {ingredient.numberAmount}{ingredient.measurement} {ingredient.ingredientName}</li>
            ))}
          </ul>
          <div className='mealNutrients'>
            <p>{meal.protein} <br/>Proteins</p>
            <p>{meal.carbs} <br/>Carbs</p>
            <p>{meal.fat} <br/>Fats</p>
          </div>
        </div>
      )
      )}
  </div>
 )
}


//This should be on its own component
function NavBar() {

  return (
    <div className= "NavBar">
      <button><i class="fi fi-rr-home"></i></button>
      <button><i class="fi fi-rr-add"></i></button>
      <button><i class="fi fi-rr-user"></i></button>
    </div>
  )
}

export default function Homepage() {
  return (
    <div className='Homepage'>
    <Day />
    <Results />
    <Meals />
    <NavBar />
    </div>
  )
}
