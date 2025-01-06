import React, { useContext } from 'react'
import mealsForOneDate from '../../context/mealsForOneDate';
import profileInfoContext from '../../context/profileInfo';

export default function DeleteButton({index}) {

    const {currentDay,setCurrentDay} = useContext(mealsForOneDate)
    const {id,chosenNutrients} = useContext(profileInfoContext).profileInfo

    async function deleteMeal(event){
        event.preventDefault();

        const updatedDay = currentDay;
        setCurrentDay(null);

        await updatedDay.deleteMeal(id, index, chosenNutrients);

        await updatedDay.getMeals(id,chosenNutrients);

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
