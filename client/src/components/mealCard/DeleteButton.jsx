import React, { useContext } from 'react'
import mealsForOneDate from '../../context/mealsForOneDate';
import profileInfoContext from '../../context/profileInfo';

export default function DeleteButton({index}) {

    const {currentDay,setCurrentDay} = useContext(mealsForOneDate)
    const {profileInfo} = useContext(profileInfoContext)

    async function deleteMeal(event){
        event.preventDefault();

        const updatedDay = currentDay;
        setCurrentDay(null);

        await updatedDay.deleteMeal(profileInfo.id,index, profileInfo.chosenNutrients);

        await updatedDay.getMeals(profileInfo.id,profileInfo.chosenNutrients);

        setCurrentDay(updatedDay);
    }

  return (
    <button
        className='roundButton'
        style={{height:"25px",width:"25px",fontSize:"0.8em"}}
        onClick={(event)=>deleteMeal(event)}
    >
        <i className='fi fi-rr-cross-small' ></i>
    </button>
  )
}
