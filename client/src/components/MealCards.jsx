
import { useContext, useEffect, useState } from 'react';
import '../styles/MealCards.css'
import mealsForOneDate from '../context/mealsForOneDate';

import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import unitNutrients from '../utilities/measurmentUnitNutrients';
import profileInfoContext from '../context/profileInfo';

import axios from 'axios';

export default function MealCards() {
 
    const {profileInfo} = useContext(profileInfoContext);
    let {meals,nutrients,setMeals,setNutrients,day} = useContext(mealsForOneDate);

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

    async function deleteMeal(event,index){
      event.preventDefault();

      try {

        const date = new Date(day).toLocaleDateString('en-CA');

        const response = await axios.delete(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.id}/${date}/${index}`)

        if(response.status===200){
          setMeals(response.data.meals);
          setNutrients(response.data.nutrients);
        }

      } catch(err){
        console.log(err)
      }
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

                <button className='roundButton' style={{height:"25px",width:"25px",fontSize:"0.8em"}}><i className="fi fi-rr-pencil"></i></button>

                <button className='roundButton' 
                style={{height:"25px",width:"25px",fontSize:"0.8em"}}
                onClick={(event)=>deleteMeal(event,index)}>
                  <i className="fi fi-rr-cross-small"></i>
                </button>
                
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