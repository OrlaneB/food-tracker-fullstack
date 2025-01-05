/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react"
import '../styles/Day.css'

import { DateTime } from "luxon";
import profileInfoContext from '../context/profileInfo'
import Day from "../utilities/classes/DayClass";
import mealsForOneDate from "../context/mealsForOneDate";
import Title from "./calendar/Title";
import Buttons from "./calendar/Buttons";


export default function Calendar() {

    const {profileInfo} = useContext(profileInfoContext);
    const {currentDay,setCurrentDay,daysArray,setDaysArray} = useContext(mealsForOneDate)

    const [displayedDates, setDisplayedDates] = useState([]);

    const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

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

    async function handleChangeDate(event,date){
        event.preventDefault();

        let newDay = daysArray.find(d=>d.date===date);

        if(!newDay){
            // console.log(date);
            newDay = new Day(date);
            await newDay.getMeals(profileInfo.id,profileInfo.chosenNutrients);
            newDay = Object.assign(Object.create(Object.getPrototypeOf(newDay)), newDay);
            
            const newArray = [...daysArray];
            newArray.push(newDay);
            setDaysArray(newArray);

        }

        setCurrentDay(newDay);

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

                {displayedDates.map((date,index)=>(
                    <div 
                        className={date==currentDay.date? "selectedDate dateBlock":"dateBlock"}
                        key={index}
                        onClick={(event)=>handleChangeDate(event,date)}
                    >
                        <p className="greyText">{week[new Date(date).getDay()]}</p>
                        <p className="numberDate">{new Date(date).getDate()}</p>
                        <p className="greyText">{month[new Date(date).getMonth()]}</p>
                    </div>
                ))}

            </Buttons>

        </div>}
        </>
    )                                
}