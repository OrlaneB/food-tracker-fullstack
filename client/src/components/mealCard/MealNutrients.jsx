import React, { useContext } from 'react'
import profileInfoContext from '../../context/profileInfo'
import userFriendlyNutrientNames from '../../utilities/userFriendlyNutrientNames';
import mealCardContext from '../../context/mealCard';

export default function MealNutrients() {
    const {meal} = useContext(mealCardContext);
    const {chosenNutrients} = useContext(profileInfoContext).profileInfo;

    const colors = ["#EA5F3A","#F79285","#FBC46C"];

  return (
    <div className='mealNutrients'>
        {meal.getNutrients(chosenNutrients).map((nutrient,index)=>(
            <p key={index} 
                style={{backgroundColor:colors[index]}}
            >
                <span className='amount'>
                    {nutrient.amount}
                </span> <br/>

                {userFriendlyNutrientNames[nutrient.name]}
            </p>
        ))}
    </div>
  )
}
