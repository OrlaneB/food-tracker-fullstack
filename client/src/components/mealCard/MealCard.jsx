import React, { useContext, useEffect, useState } from 'react'
import profileInfoContext from '../../context/profileInfo'
import ToggleButton from './ToggleButton';

export default function MealCard({openedMeals,setOpenedMeals,index}) {

    const {profileInfo} = useContext(profileInfoContext);
    const [isOpen,setIsOpen] = useState(false);

    // function handleToggleOpen(){
    //     let newList;

    //     if(openedMeals.includes(index)) { 
    //       newList = openedMeals.filter(m=>m!==index);
    //     } else { 
    //       newList = [...openedMeals,index];
    //     }
  
    //     setOpenedMeals(newList);
    //   }

    useEffect(()=>{
        setIsOpen(openedMeals.includes(index));
    },[openedMeals])

  return (
    <>
        <ToggleButton openedMeals={openedMeals} isOpen={isOpen} setOpenedMeals={setOpenedMeals} index={index} />

        <h3 style={{display:"inline",marginLeft:"10px"}}>
            Meal #{index+1}
        </h3>
    </>
  )
}
