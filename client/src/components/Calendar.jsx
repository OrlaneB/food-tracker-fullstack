/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react"
import '../styles/Day.css'

import mealsForOneDate from "../context/mealsForOneDate";
import Title from "./calendar/Title";
import Buttons from "./calendar/Buttons";
import DisplayedDates from "./calendar/DisplayedDates"
import createDisplayedDates from "../utilities/calendar/createDisplayedDates";

export default function Calendar() {

    const {currentDay} = useContext(mealsForOneDate)

    const [displayedDates, setDisplayedDates] = useState([]);


    useEffect(()=>{
       if(currentDay && displayedDates.length===0){
        const newDates = createDisplayedDates(currentDay.date);
        setDisplayedDates(newDates);
       }
        
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