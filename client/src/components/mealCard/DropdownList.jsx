import React from 'react'

export default function DropdownList({meal}) {
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
