/* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
import '../styles/Homepage.css'
import '../styles/Day.css'
import '../styles/Meals.css'
import '../styles/NavBar.css'

// Each meal
let objMeal1 = {
  ingredients : [
<<<<<<< HEAD
    {ingredientName : "rice", numberAmount : '30', measurement : "g", protein : "3", carbs : "12", fat : "2" },
    {ingredientName : "chicken", numberAmount : "40", measurement : "g", protein : "4", carbs : "12", fat : "2" },
    {ingredientName : "broccoli", numberAmount : "50", measurement : "g", protein : "3", carbs : "12", fat : "2" },
    //...
  ],
  protein : '10',
  carbs : '23',
  fat : "3"
=======
    {ingredientName : "rice", numberAmount : "1", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "tomato", numberAmount : "3", measurement : "portion", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "cheese", numberAmount : "30", measurement : "g", protein : "x g", carbs : "y g", fat : "z g" },
    {ingredientName : "apple", numberAmount : "150", measurement : "g", protein : "x g", carbs : "y g", fat : "z g" },
    //...
  ],
  protein : '10g',
  carbs : '15g',
  fat : "1g"
>>>>>>> 6e01fe0e990d4d517d723526a575eb9973e390b6
}

/* Calculate the nutrient in a method inside the meal object
 {proteinCopy+=item.numberAmount}

*/

let objMeal2 = {
<<<<<<< HEAD
  protein : '15',
  carbs : '8',
  fat : "7"
}

let objMeal3 = {
  protein : '12',
  carbs : '4',
  fat : "11"
=======
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
>>>>>>> 6e01fe0e990d4d517d723526a575eb9973e390b6
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

<<<<<<< HEAD
// function Results(obj) {
//     const [test,setTest] = useState({});
//     const [count,setCount] = useState([1,2,3])

//     return (
//       <div>
//           {count.map((e)=>{
//             // setTest(obj);
//             // console.log(test);
//             console.log(e)}
//           )}
//       </div>
//     )
// }

/* Pseudo code for meal component

  Display the numberAmount of the ingredient, 
  The measurement and the ingredientName on the same line
  In an unordered list

  And then, display the total amount of three nutrients for the whole meal.
  This info will come from the nutrient data in each ingredient
*/
function Meals({meal}) {

  const mealCopy = {...meal}
  // console.log(mealCopy.ingredients)
  const proteinCopy = mealCopy.protein;

  return(
    <div>
      <ul>
       { mealCopy.ingredients.map((item,index) => {
        return(      
          <li key={index}>{item.numberAmount} {item.measurement} {item.ingredientName}</li>
        )
       
        })}
      </ul>

      <p>{proteinCopy}g {mealCopy.carbs}g {mealCopy.fat}g</p>
    </div>
  )
=======
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
>>>>>>> 6e01fe0e990d4d517d723526a575eb9973e390b6

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

function NavBar() {
// this will have state to change views between Day, AddMeal, and Profile

  return (
<<<<<<< HEAD
    <div>
    <CurrentDay />
    {/* <Results /> */}
    <Meals meal={objMeal1}/>
=======
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
>>>>>>> 6e01fe0e990d4d517d723526a575eb9973e390b6
    </div>
  )
}
