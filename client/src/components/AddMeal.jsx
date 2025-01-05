import React, { useState } from 'react';

import "../styles/AddAMeal.css";
import MealForm from './MealForm';

export default function AddMeal() {


    let today = `${new Date().getFullYear()}-${new Date().getMonth()+1<10?"0"+String(new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate().length===2?new Date().getDate():"0"+new Date().getDate()}`;

    const [dateInput,setDateInput]=useState(today);

    const [warningOn,setIsWarningOn] = useState(false);

  return (
    <div id='AddAMeal'>

      <h2>Log the meal for
        <input type='date' 
              value={dateInput}
              onChange={(event)=>setDateInput(event.target.value)}/>
      </h2>
      <MealForm date={dateInput} functionnality={"create"}/>

    
    </div>

  )
}
