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

    function createCalendar(){
        const daysNumber = window.innerWidth>600 ? 3 : 2;
        const display = new linkedList(currentDay.date,daysNumber);
        setLinkedListDates(display);
        setDisplayedDates(display.getDates());
    }


    useEffect(()=>{
       if(currentDay && displayedDates.length===0){
            createCalendar();

            const handleResize = () => createCalendar();

            window.addEventListener("resize",handleResize);

            return()=> window.removeEventListener("resize",handleResize);
       }

       if(currentDay){
            const handleResize = () => createCalendar();

            window.addEventListener("resize",handleResize);

            return()=> window.removeEventListener("resize",handleResize);
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