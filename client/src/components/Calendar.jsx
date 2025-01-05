/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react"
import '../styles/Day.css'

import { DateTime } from "luxon";
import mealsForOneDate from "../context/mealsForOneDate";
import Title from "./calendar/Title";
import Buttons from "./calendar/Buttons";
import DisplayedDates from "./calendar/DisplayedDates";


export default function Calendar() {

    const {currentDay,setCurrentDay,daysArray,setDaysArray} = useContext(mealsForOneDate)

    const [displayedDates, setDisplayedDates] = useState([]);

    

    function createDisplayedDates(){
        
        const dateObj = new Date(currentDay.date);
        let startDate = DateTime.local(dateObj.getFullYear(),dateObj.getMonth()+1,dateObj.getDate());

        setDisplayedDates([
            startDate.minus({days:3}).toISODate(),
            startDate.minus({days:2}).toISODate(),
            startDate.minus({days:1}).toISODate(),
            currentDay.date,
            startDate.plus({days:1}).toISODate(),
            startDate.plus({days:2}).toISODate(),
            startDate.plus({days:3}).toISODate(),
        ])
    }



    useEffect(()=>{
       if(currentDay && displayedDates.length===0) 
        createDisplayedDates()
    },[currentDay])
    
   
    return (
        <>
        {currentDay && displayedDates && <div id="Day">
            
            <Title />

            <Buttons displayedDates={displayedDates} setDisplayedDates={setDisplayedDates}>

                <DisplayedDates displayedDates={displayedDates}/>

            </Buttons>

        </div>}
        </>
    )                                
}