
import { useContext, useEffect, useState } from 'react';
import '../styles/MealCards.css'
import mealsForOneDate from '../context/mealsForOneDate';

import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import unitNutrients from '../utilities/measurmentUnitNutrients';
import profileInfoContext from '../context/profileInfo';

export default function MealCards() {
 
    const {profileInfo} = useContext(profileInfoContext);
    let {meals,nutrients} = useContext(mealsForOneDate);

    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const [openedMeals,setOpenedMeals]=useState([]);

    const chosenNutrients = [];

    for(let key in profileInfo.chosenNutrients){
      const nutrient = profileInfo.chosenNutrients[key];

      chosenNutrients.push(nutrient.name);
    }

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
                    {Object.keys(meals[index]).map((item,j)=>(
                      <li key={j}>{item} {meals[index][item]}g</li>
                    ))}
                  </ul>}

             </div>

             <div className='mealNutrients'>

              {nutrients && 
                  Object.keys(nutrients[index]).sort((a,b)=>a>b).filter(n=>chosenNutrients.includes(n)).map((item,k)=>(
                  <p key={k}
                    style={{backgroundColor:colors[k]}}>
                      <span className='amount'>{nutrients[index][item]||""} {unitNutrients[item]||""}</span> <br/>
                      {userFriendlyNutrientNames[item]||""}
                  </p>
                ))
              }

              </div>
             
           </div>

         )
         )} 

         
     </div>
    )
   }