
import { useContext, useEffect, useState } from 'react';
import '../styles/MealCards.css'
const authKey = import.meta.env.VITE_APP_API_KEY;



import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import profileInfoContext from '../context/profileInfo';
import mealsForOneDate from '../context/mealsForOneDate';
import MealForm from './MealForm';


export default function MealCards() {
 
    const {profileInfo} = useContext(profileInfoContext);
    const {currentDay,setCurrentDay,meals,setMeals,setTotalNutrients,setPercentageNutrients} = useContext(mealsForOneDate)
  
    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const [openedMeals,setOpenedMeals]=useState([]);
    const [modifiedMeal,setModifiedMeal]=useState();
    // const [removed, setRemoved]=useState([]);
    
    const [onFocusInput,setOnFocusInput]=useState(null);

 

    function handleToggleOpen(index){
      let newList;
      if(openedMeals.includes(index)) { 
        newList = openedMeals.filter(m=>m!==index);
      } else { 
        newList = [...openedMeals,index];
      }

      setOpenedMeals(newList);
    }


    function onChangeMealInputs(event,index){
      const {name,value} = event.target;

      let newIngredients = [...ingredientLists];
      newIngredients[index][name] = value;

      setIngredientLists(newIngredients);

      if(name==="name") {
        getSuggestions(value);
        setOnFocusInput(index);
      }
    }

    function turnIntoForm(event,index){
      event.preventDefault();

      setModifiedMeal(index);

      // const ingredientArray = [];

      // for(let ing in meals[index]){
      //   const ingredient = {name:ing,amount:meals[index][ing]}
      //   ingredientArray.push(ingredient)
      // }
      

      // setIngredientLists(ingredientArray);

    }

    

    function handleClickSuggestion(index, suggestion){
      let newList = [...ingredientLists];
      newList[index].name = suggestion;

      setIngredientLists(newList);
      setOnFocusInput(null);
    }

    async function deleteMeals(event,index){
      event.preventDefault();

      const updatedDay = currentDay;
      setCurrentDay(null);

      await updatedDay.deleteMeal(profileInfo.id, index, profileInfo.chosenNutrients);
      await updatedDay.getMeals(profileInfo.id, profileInfo.chosenNutrients);

      setCurrentDay(updatedDay);
    
    }



    return (
     <div className='Meals'>
         { currentDay.meals &&
         
         currentDay.meals.map((meal, index) =>(

           <div key={index} className='mealContainer'>

            {modifiedMeal!==index && 
              <>
              <div id="listContainer">

                <button 
                  style=
                    {openedMeals.includes(index)? {transform:"rotate(90deg)",display:"inline"}:{display:"inline"}} 
                  className='roundButton'
                  onClick={()=>handleToggleOpen(index)}>
                    &gt;
                </button>

                <h3 style={{display:"inline",marginLeft:"10px"}}>
                  Meal #{index+1}
                </h3>

                <button 
                  className='roundButton' 
                  style={{height:"25px",width:"25px",fontSize:"0.8em"}}
                  onClick={(event)=>turnIntoForm(event,index)}>
                    <i className="fi fi-rr-pencil"></i>
                </button>

                <button 
                  className='roundButton' 
                  style={{height:"25px",width:"25px",fontSize:"0.8em"}}
                  onClick={(event)=>deleteMeals(event,index)}>
                    <i className="fi fi-rr-cross-small"></i>
                </button>
                
                { openedMeals.includes(index) &&
                  <ul>
                    {meal.getIngredients().map((item,j)=>(
                      <li key={j}>{item.name} {item.amount}g</li>
                    ))}
                  </ul>}

             </div>

             <div className='mealNutrients'>

              {meal.getNutrients(profileInfo.chosenNutrients).map((nut,k)=>(
                <p key={k} style={{backgroundColor:colors[k]}}>
                  <span className='amount'>
                    {nut.amount}
                  </span> <br/>
                    {userFriendlyNutrientNames[nut.name]}
                </p>
              ))}

              

              </div>
              </>
            }

            {modifiedMeal===index && 
              <>
                {/* <h3 style={{display:"inline",marginLeft:"10px"}}>
                Meal #{index+1}
                </h3> */}
                <MealForm mealIndex={index} ing={meal.getIngredients()} />
              </>
            // <div className='modified'>

            //   <h3 style={{display:"inline",marginLeft:"10px"}}>
            //     Meal #{index+1}
            //   </h3>

            //   <form onSubmit={(event)=>event.preventDefault()}>
            //     {ingredientLists.map((ing,j)=>(
            //       <div key={j}>

            //         <input 
            //           className='ingName' 
            //           value={ing.name} 
            //           onChange={(event)=>onChangeMealInputs(event,j)} 
            //           placeholder='Name of ingredient'
            //           name='name' 
            //           type='text'/>

            //         <input 
            //           className='ingAmount' 
            //           value={ing.amount} 
            //           onChange={(event)=>onChangeMealInputs(event,j)} 
            //           name='amount' 
            //           type='number'/>g

            //         <button 
            //           className='roundButton' 
            //           onClick={()=>deleteAnIngredient(j)}>
            //             <i className='fi fi-rr-cross-small'></i>
            //         </button>

            //         {onFocusInput===j && suggestions && suggestions.map((s,index)=>(
            //           <p key={index} onClick={()=>handleClickSuggestion(j,s)}>{s}</p>
            //         ))}

            //       </div>
            //     ))}

            //     <button 
            //       className='textButton' 
            //       onClick={(event)=>addAnIngredient(event)}>
            //         Add an ingredient
            //     </button>

            //     <button
            //       className='importantTextButton'
            //       onClick={(event)=>updateMeal(event,index)}
            //     >
            //         Update the meal
            //     </button>

            //   </form>
                
            // </div>
            }
             
           </div>

         )
         )} 

         
     </div>
    )
   }