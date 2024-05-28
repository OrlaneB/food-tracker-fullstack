/* eslint-disable react/prop-types */
import '../styles/MealCards.css'

export default function MealCards({objDay}) {
    // copy dummy data
    const arrMeals = objDay.meals;
   
    //render meal information
    return (
     <div className='Meals'>
         {/* {console.log(arrMeals)} */}
         {arrMeals.map((meal, index) =>(
           // console.log(meal);
           // console.log(index);
           <div key={index} className='mealContainer'>
             <ul>
               {/* {console.log(meal.ingredients[0].ingredientName)} */}
               {meal.ingredients.map((ingredient, index2) => (
                 <li key={index2}>• {ingredient.numberAmount}{ingredient.measurement} {ingredient.ingredientName}</li>
               ))}
             </ul>
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