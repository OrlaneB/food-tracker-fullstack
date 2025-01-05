import React, { useContext } from 'react'
import mealsForOneDate from '../../context/mealsForOneDate'

export default function Title() {
    const {currentDay} = useContext(mealsForOneDate);
    
  return (
    <h3 id="displayedDate">
        {new Date(currentDay.date).toLocaleDateString("en-US",{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        })}
    </h3>
  )
}
