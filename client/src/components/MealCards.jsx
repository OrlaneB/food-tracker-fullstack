/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import '../styles/MealCards.css'
import mealsForOneDate from '../context/mealsForOneDate';

export default function MealCards({objDay}) {
    // copy dummy data
    const arrMeals = objDay.meals;

    let {meals,nutrientsByMeal} = useContext(mealsForOneDate);

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
         { meals &&
         
         meals.map((meal, index) =>(

           <div key={index} className='mealContainer'>
            <div style={{display:"flex", alignItems:"center"}}>
            <button style={openedMeals.includes(index)? {transform:"rotate(90deg)"}:{}} 
                    onClick={()=>handleToggleOpen(index)} >&gt;</button>
            <h3>Meal #{index+1}</h3>
            </div>
            
             { openedMeals.includes(index) &&
              <ul>
               {Object.keys(meal).map((ingredient, index2) => (
                  <li key={index2}>{meal[ingredient]}g {ingredient}</li>
               ))}
             </ul>}

             <div className='mealNutrients'>
               <p> {nutrientsByMeal[index][0].nutrient_number_amount}g <br/>Proteins</p>
               <p> {nutrientsByMeal[index][1].nutrient_number_amount}g <br/>Carbs</p>
               <p> {nutrientsByMeal[index][2].nutrient_number_amount}g <br/>Fats</p>
             </div>
           </div>

         )
         )}
     </div>
    )
   }