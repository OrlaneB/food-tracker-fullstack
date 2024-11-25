
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

    // useEffect(()=>{
    //   if(nutrients) {
    //     Object.keys(nutrients[0][1]).filter(n=>chosenNutrients.includes(n)).map(item=>{
    //       console.log(item)
    //       console.log(nutrients[0][1][item])
    //       console.log(unitNutrients[item])
    //     })
    //   }
      
    // },[nutrients])


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
                    {Object.keys(meals[index][index+1]).map((item,j)=>(
                      <li key={j}>{item} {meals[index][index+1][item]}g</li>

                    ))}
                  </ul>}

             </div>

             <div className='mealNutrients'>

              {nutrients && 
                  Object.keys(nutrients[index][index+1]).filter(n=>chosenNutrients.includes(n)).map((item,k)=>(
                  <p key={k}
                    style={{backgroundColor:colors[k]}}>
                      <span className='amount'>{nutrients[index][index+1][item]||""} {unitNutrients[item]||""}</span> <br/>
                      {item||""}
                  </p>
                ))}

              </div>

             {/* {nutrients[index][0] && <div className='mealNutrients'>
              
               <p style={{backgroundColor:colors[0]}}>
                <span className='amount'>
                  {nutrients[index][0]?nutrients[index][0].nutrient_number_amount+unitNutrients[nutrients[index][0].nutrient_name]:""} 
                </span><br/>
                  {nutrients[index][0]?userFriendlyNutrientNames[nutrients[index][0].nutrient_name]:""}
               </p>

               <p style={{backgroundColor:colors[1]}}>
                <span className='amount'>
                  {nutrients[index][1]?nutrients[index][1].nutrient_number_amount+unitNutrients[nutrients[index][1].nutrient_name]:""} 
                </span><br/>
                    {nutrients[index][1]?userFriendlyNutrientNames[nutrients[index][1].nutrient_name]:""}
                </p>

               <p style={{backgroundColor:colors[2]}}> 
                <span className='amount'>
                  {nutrients[index][2]?nutrients[index][2].nutrient_number_amount+unitNutrients[nutrients[index][2].nutrient_name]:""} 
                </span> <br/>
                  {nutrients[index][2]?userFriendlyNutrientNames[nutrients[index][2].nutrient_name]:""}
                </p>

             </div>}*/}
             
           </div>

         )
         )} 

         
     </div>
    )
   }