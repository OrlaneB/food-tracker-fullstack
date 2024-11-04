/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import '../styles/Day.css'

import { DateTime } from "luxon";


export default function Day({dateObj}) {

    const [displayedDates, setDisplayedDates] = useState([]);

    const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    function createDisplayedDates(){
        let startDate = DateTime.local(dateObj.day.getFullYear(),dateObj.day.getMonth()+1,dateObj.day.getDate());

        setDisplayedDates([
            startDate.minus({days:3}),
            startDate.minus({days:2}),
            startDate.minus({days:1}),
            dateObj.day,
            startDate.plus({days:1}),
            startDate.plus({days:2}),
            startDate.plus({days:3}),
        ])
    }

    function handleChangeDate(event,date){
        event.preventDefault();

        dateObj.setDay(new Date(date));
    }


    function moveSelectedDates(event,type){
        event.preventDefault();

        let newDates = [...displayedDates];

        if(type==="down"){

            let copiedDate = new Date(newDates[0]);
            let addedDate = DateTime.local(copiedDate.getFullYear(), copiedDate.getMonth()+1, copiedDate.getDate()).minus({days:1});
            newDates.unshift(addedDate);
            newDates.pop();

        }else if(type==="up"){

            let copiedDate = new Date(newDates[6]);
            let addedDate = DateTime.local(copiedDate.getFullYear(), copiedDate.getMonth()+1, copiedDate.getDate()).plus({days:1});
            newDates.push(addedDate);
            newDates.shift();

        }

        setDisplayedDates(newDates)
    }

    useEffect(()=>{
        createDisplayedDates();
    },[])
    
   
    return (
          
        <div id="Day">
            <h3 id="displayedDate">{dateObj.day.toDateString()}</h3>

            <div id="datesContainer">
                
                <button className="roundButton" onClick={(event)=>moveSelectedDates(event,"down")}>←</button>

                {displayedDates.map((date,index)=>(
                    <div 
                        className={new Date(date).getTime()==dateObj.day.getTime()? "selectedDate dateBlock":"dateBlock"}
                        key={index}
                        onClick={(event)=>handleChangeDate(event,date)}
                    >
                        <p className="greyText">{week[new Date(date).getDay()]}</p>
                        <p className="numberDate">{new Date(date).getDate()}</p>
                        <p className="greyText">{month[new Date(date).getMonth()]}</p>
                    </div>
                ))}

                <button className="roundButton" onClick={(event)=>moveSelectedDates(event,"up")}>→</button>

            </div>
        </div>
    )                                
}