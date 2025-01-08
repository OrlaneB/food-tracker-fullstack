import React, { useContext, useEffect, useState } from 'react'
import mealCardContext from '../../context/mealCard';

export default function ToggleButton() {

    const {openedMeals,setOpenedMeals,index} = useContext(mealCardContext);

    const [isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
        setIsOpen(openedMeals.includes(index))
    },[openedMeals])

    function handleToggleOpen(){
        let newList;

        if(isOpen) { 
          newList = openedMeals.filter(m=>m!==index);
        } else { 
          newList = [...openedMeals,index];
        }
  
        setOpenedMeals(newList);
      }

  return (

        <button
            style={isOpen? {transform:"rotate(90deg)",dipslay:"inline"} : {display:"inline"}} 
            className='roundButton'
            onClick={()=>handleToggleOpen()}>
            &gt;
        </button>
  )
}
