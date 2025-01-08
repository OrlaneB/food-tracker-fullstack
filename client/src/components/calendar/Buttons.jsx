import React from 'react'
import { DateTime } from "luxon";


export default function Buttons({setDisplayedDates,children,list}) {

    function moveSelectedDates(event,type){
            event.preventDefault();

            if(type!=="down" && type!=="up") throw new Error("The type of the button is uncorrect.")
    
            type==="down" ? list.addDateBefore() : list.addDateAfter();
    
            setDisplayedDates(list.getDates());
        }

  return (
    <div id='datesContainer'>
        <button className='roundButton'
            onClick={(event)=>moveSelectedDates(event,"down")}>
            ←
        </button>

        <main>{children}</main>

        <button className='roundButton'
            onClick={(event)=>moveSelectedDates(event,"up")}>
            →
        </button>
    </div>
  )
}
