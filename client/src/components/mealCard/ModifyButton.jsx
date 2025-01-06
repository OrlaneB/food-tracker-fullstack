import React from 'react'

export default function ModifyButton({setModifiedMeal,index}) {

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
