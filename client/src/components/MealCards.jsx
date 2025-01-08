
import { useContext,  useState } from 'react';
import '../styles/MealCards.css'

import mealsForOneDate from '../context/mealsForOneDate';
import MealForm from './MealForm';
import MealCard from './mealCard/MealCard';

import mealCardContext from '../context/mealCard';


export default function MealCards() {

    const {currentDay} = useContext(mealsForOneDate);


    const [openedMeals,setOpenedMeals]=useState([]);
    const [modifiedMeal,setModifiedMeal]=useState(null); 



    return (
     <div className='Meals'>
         { currentDay.meals &&
         
         currentDay.meals.map((meal, index) =>(

           <div key={index} className='mealContainer'>

            {modifiedMeal!==index && 
              <mealCardContext.Provider 
                value={{openedMeals,setOpenedMeals,setModifiedMeal,index,meal}}>

                <MealCard />
                
              </mealCardContext.Provider>
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