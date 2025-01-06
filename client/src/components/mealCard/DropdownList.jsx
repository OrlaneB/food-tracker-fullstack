import React, { useContext } from 'react'
import mealCardContext from '../../context/mealCard'

export default function DropdownList() {
    const {meal} = useContext(mealCardContext);
  return (
    <ul>
        {meal.getIngredients().map((item,index)=>(
            <li key={index}>
                {item.name} {item.amount}g
            </li>
        ))}
    </ul>
  )
}
