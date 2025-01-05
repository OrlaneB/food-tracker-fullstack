import React from 'react'
import { DateTime } from "luxon";


export default function Buttons({displayedDates,setDisplayedDates,children}) {

    function moveSelectedDates(event,type){
            event.preventDefault();
    
            let newDates = [...displayedDates];
    
            if(type==="down"){
    
                let copiedDate = new Date(newDates[0]);
                let addedDate = DateTime.local(copiedDate.getFullYear(), copiedDate.getMonth()+1, copiedDate.getDate()).minus({days:1}).toISODate();
                newDates.unshift(addedDate);
                newDates.pop();
    
            }else if(type==="up"){
    
                let copiedDate = new Date(newDates[6]);
                let addedDate = DateTime.local(copiedDate.getFullYear(), copiedDate.getMonth()+1, copiedDate.getDate()).plus({days:1}).toISODate();
                newDates.push(addedDate);
                newDates.shift();
    
            }
    
            setDisplayedDates(newDates)
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
