/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../styles/MealCards.css'

export default function MealCards({objDay}) {
    // copy dummy data
    const arrMeals = objDay.meals;

    const [openedMeals,setOpenedMeals]=useState([]);

    function handleToggleOpen(index){
      let newList;
      if(openedMeals.includes(index)) { newList = openedMeals.filter(m=>m!==index);
      } else { newList = [...openedMeals,index];}

      setOpenedMeals(newList);
    }
   
    //render meal information
    return (
     <div className='Meals'>
         {arrMeals.map((meal, index) =>(

           <div key={index} className='mealContainer'>
            <div style={{display:"flex", alignItems:"center"}}>
            <button style={openedMeals.includes(index)? {transform:"rotate(90deg)"}:{}} 
                    onClick={()=>handleToggleOpen(index)} >&gt;</button>
            <h3>Meal #{index+1}</h3>
            </div>
            
             { openedMeals.includes(index) &&
              <ul>
               {meal.ingredients.map((ingredient, index2) => (
                 <li key={index2}>{ingredient.numberAmount}{ingredient.measurement} {ingredient.ingredientName}</li>
               ))}
             </ul>}

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