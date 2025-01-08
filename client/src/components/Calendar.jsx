/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react"
import '../styles/Day.css'

import mealsForOneDate from "../context/mealsForOneDate";
import Title from "./calendar/Title";
import Buttons from "./calendar/Buttons";
import DisplayedDates from "./calendar/DisplayedDates"
import linkedList from "../utilities/calendar/linkedList";

export default function Calendar() {

    const {currentDay} = useContext(mealsForOneDate)

    const [displayedDates, setDisplayedDates] = useState([]);
    const [linkedListDates,setLinkedListDates] = useState(null);


    useEffect(()=>{
       if(currentDay && displayedDates.length===0){
        const display = new linkedList(currentDay.date,3);
        setLinkedListDates(display);
        setDisplayedDates(display.getDates());
       }
        
    },[currentDay])
    
   
    return (
        <>
        {currentDay && displayedDates && <div id="Day">
            
            <Title />

            <Buttons setDisplayedDates={setDisplayedDates} list={linkedListDates}>

                <DisplayedDates displayedDates={displayedDates}/>

            </Buttons>

        </div>}
        </>
    )                                
}