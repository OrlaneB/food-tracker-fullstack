import React, { useContext, useEffect, useState } from 'react'
import profileInfoContext from '../../context/profileInfo'
import ToggleButton from './ToggleButton';
import DropdownList from './DropdownList';
import ModifyButton from './ModifyButton';

export default function MealCard({openedMeals,setOpenedMeals, setModifiedMeal, index,meal}) {

    const {profileInfo} = useContext(profileInfoContext);
    const [isOpen,setIsOpen] = useState(false);


    useEffect(()=>{
        setIsOpen(openedMeals.includes(index));
    },[openedMeals])

  return (
    <>
        <div id='listContainer'>
            <ToggleButton openedMeals={openedMeals} isOpen={isOpen} setOpenedMeals={setOpenedMeals} index={index} />

            <h3 style={{display:"inline",marginLeft:"10px"}}>
                Meal #{index+1}
            </h3>

            <ModifyButton setModifiedMeal={setModifiedMeal} index={index}/>

            {isOpen &&
                <DropdownList meal={meal}/>
            }
        </div>
    </>
  )
}
