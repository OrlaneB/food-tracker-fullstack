/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import '../styles/Day.css'
// import meals for corresponding day

// create a new data object to store current date
// const currentDate = new Date();

// The day component renders the meals that have been inputted for that day

export default function Day({dateObj}) {

    const today = new Date();



    function handleChangeDate(event,type){
        event.preventDefault();
        let newDate = new Date();

        type==="before"?
        newDate.setDate(dateObj.day.getDate() - 1) :
        type==="after"?
        newDate.setDate(dateObj.day.getDate() + 1) : "";

        dateObj.setDay(newDate)
    }

    
   
    return (
        <div className='Day'>
            <button onClick={(event)=>handleChangeDate(event,"before")}>←</button>
            <div>
                <p>foodtracker</p>
                <p>{dateObj.day.toDateString()}</p> 
            </div>
            <button onClick={(event)=>handleChangeDate(event,"after")} disabled={dateObj.day.getDate()===today.getDate()?"disabled":""}>→</button>
        </div>    
    )                                
}