
import { useContext,  useState } from 'react';
import '../styles/MealCards.css'



import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import profileInfoContext from '../context/profileInfo';
import mealsForOneDate from '../context/mealsForOneDate';
import MealForm from './MealForm';
import MealCard from './mealCard/MealCard';


export default function MealCards() {
 
    const {profileInfo} = useContext(profileInfoContext);
    const {currentDay,setCurrentDay} = useContext(mealsForOneDate)
  
    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const [openedMeals,setOpenedMeals]=useState([]);
    const [modifiedMeal,setModifiedMeal]=useState();    

 

    // function handleToggleOpen(index){
    //   let newList;
    //   if(openedMeals.includes(index)) { 
    //     newList = openedMeals.filter(m=>m!==index);
    //   } else { 
    //     newList = [...openedMeals,index];
    //   }

    //   setOpenedMeals(newList);
    // }


    function turnIntoForm(event,index){
      event.preventDefault();

      setModifiedMeal(index);

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
              <MealCard openedMeals={openedMeals} setOpenedMeals={setOpenedMeals} index={index}/>
            //   <>
            //   <div id="listContainer">

            //     <button 
            //       style=
            //         {openedMeals.includes(index)? {transform:"rotate(90deg)",display:"inline"}:{display:"inline"}} 
            //       className='roundButton'
            //       onClick={()=>handleToggleOpen(index)}>
            //         &gt;
            //     </button>

            //     <h3 style={{display:"inline",marginLeft:"10px"}}>
            //       Meal #{index+1}
            //     </h3>

            //     <button 
            //       className='roundButton' 
            //       style={{height:"25px",width:"25px",fontSize:"0.8em"}}
            //       onClick={(event)=>turnIntoForm(event,index)}>
            //         <i className="fi fi-rr-pencil"></i>
            //     </button>

            //     <button 
            //       className='roundButton' 
            //       style={{height:"25px",width:"25px",fontSize:"0.8em"}}
            //       onClick={(event)=>deleteMeals(event,index)}>
            //         <i className="fi fi-rr-cross-small"></i>
            //     </button>
                
            //     { openedMeals.includes(index) &&
            //       <ul>
            //         {meal.getIngredients().map((item,j)=>(
            //           <li key={j}>{item.name} {item.amount}g</li>
            //         ))}
            //       </ul>}

            //  </div>

            //  <div className='mealNutrients'>

            //   {meal.getNutrients(profileInfo.chosenNutrients).map((nut,k)=>(
            //     <p key={k} style={{backgroundColor:colors[k]}}>
            //       <span className='amount'>
            //         {nut.amount}
            //       </span> <br/>
            //         {userFriendlyNutrientNames[nut.name]}
            //     </p>
            //   ))}

              

            //   </div>
            //   </>
            }

            {modifiedMeal===index && 
              <>
                <MealForm mealIndex={index} ing={meal.getIngredients()} setModifiedMeal={setModifiedMeal} date={currentDay.date} functionnality={"update"}/>
              </>
            
            }
             
           </div>

         )
         )} 

         
     </div>
    )
   }