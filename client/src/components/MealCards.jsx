
import { useContext, useState } from 'react';
import '../styles/MealCards.css'
import mealsForOneDate from '../context/mealsForOneDate';

import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import unitNutrients from '../utilities/measurmentUnitNutrients';

export default function MealCards() {
 

    let {meals,nutrientsByMeal} = useContext(mealsForOneDate);

    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const [openedMeals,setOpenedMeals]=useState([]);

    function handleToggleOpen(index){
      let newList;
      if(openedMeals.includes(index)) { 
        newList = openedMeals.filter(m=>m!==index);
      } else { 
        newList = [...openedMeals,index];
      }

      setOpenedMeals(newList);
    }


    return (
     <div className='Meals'>
         { meals &&
         
         meals.map((meal, index) =>(

           <div key={index} className='mealContainer'>

            <div id="listContainer">

                <button style={openedMeals.includes(index)? {transform:"rotate(90deg)",display:"inline"}:{display:"inline"}} 
                        className='roundButton'
                        onClick={()=>handleToggleOpen(index)}>&gt;</button>

                <h3 style={{display:"inline",marginLeft:"10px"}}>Meal #{index+1}</h3>
                
                { openedMeals.includes(index) &&
                  <ul>
                    {Object.keys(meal).map((ingredient, index2) => (
                        <li key={index2}>{meal[ingredient]}g {ingredient}</li>
                    ))}
                  </ul>}

             </div>

             {nutrientsByMeal[index][0] && <div className='mealNutrients'>
              
               <p style={{backgroundColor:colors[0]}}>
                <span className='amount'>
                  {nutrientsByMeal[index][0]?nutrientsByMeal[index][0].nutrient_number_amount+unitNutrients[nutrientsByMeal[index][0].nutrient_name]:""} 
                </span><br/>
                  {nutrientsByMeal[index][0]?userFriendlyNutrientNames[nutrientsByMeal[index][0].nutrient_name]:""}
               </p>

               <p style={{backgroundColor:colors[1]}}>
                <span className='amount'>
                  {nutrientsByMeal[index][1]?nutrientsByMeal[index][1].nutrient_number_amount+unitNutrients[nutrientsByMeal[index][1].nutrient_name]:""} 
                </span><br/>
                    {nutrientsByMeal[index][1]?userFriendlyNutrientNames[nutrientsByMeal[index][1].nutrient_name]:""}
                </p>

               <p style={{backgroundColor:colors[2]}}> 
                <span className='amount'>
                  {nutrientsByMeal[index][2]?nutrientsByMeal[index][2].nutrient_number_amount+unitNutrients[nutrientsByMeal[index][2].nutrient_name]:""} 
                </span> <br/>
                  {nutrientsByMeal[index][2]?userFriendlyNutrientNames[nutrientsByMeal[index][2].nutrient_name]:""}
                </p>

             </div>}
             
           </div>

         )
         )}

         
     </div>
    )
   }