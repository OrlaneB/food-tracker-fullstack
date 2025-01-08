import React, { useContext } from 'react'
import mealCardContext from '../../context/mealCard';

export default function ModifyButton() {

    const {setModifiedMeal,index} = useContext(mealCardContext);

    function turnIntoForm(event){
        event.preventDefault();
        setModifiedMeal(index)
    }

  return (
    <button
        className='roundButton'
        style={{height:"25px",width:"25px",fontSize:"0.8em"}}
        onClick={(event)=>turnIntoForm(event)}
    >
        <i className='fi fi-rr-pencil'></i>
    </button>
  )
}
