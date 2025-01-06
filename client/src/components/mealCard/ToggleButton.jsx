import React from 'react'

export default function ToggleButton({openedMeals,isOpen,setOpenedMeals,index}) {

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
