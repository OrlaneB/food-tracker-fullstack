
import { useContext,  useState } from 'react';
import '../styles/MealCards.css'

import mealsForOneDate from '../context/mealsForOneDate';
import MealForm from './MealForm';
import MealCard from './mealCard/MealCard';


export default function MealCards() {

    const {currentDay} = useContext(mealsForOneDate)


    const [openedMeals,setOpenedMeals]=useState([]);
    const [modifiedMeal,setModifiedMeal]=useState();    



    return (
     <div className='Meals'>
         { currentDay.meals &&
         
         currentDay.meals.map((meal, index) =>(

           <div key={index} className='mealContainer'>

            {modifiedMeal!==index && 
              <MealCard openedMeals={openedMeals} setOpenedMeals={setOpenedMeals} index={index} meal={meal} setModifiedMeal={setModifiedMeal}/>
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