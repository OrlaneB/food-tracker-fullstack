/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import '../styles/Day.css'
// import meals for corresponding day

// create a new data object to store current date
// const currentDate = new Date();

// The day component renders the meals that have been inputted for that day

export default function Day({dateObj}) {

    const today = new Date();
    const [displayedDates, setDisplayedDates] = useState([]);

    const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

   

    function createDisplayedDates(){
        let startDate = new Date(Date.parse(dateObj.day));

        let dayMinusThree=new Date();
        let dayMinusTwo=new Date();
        let dayMinusOne=new Date();
        let dayPlusOne=new Date();
        let dayPlusTwo=new Date();
        let dayPlusThree=new Date();

        let newDates = [
            dayMinusThree.setDate(startDate.getDate()-3),
            dayMinusTwo.setDate(startDate.getDate()-2),
            dayMinusOne.setDate(startDate.getDate()-1),
            dateObj.day,
            dayPlusOne.setDate(startDate.getDate()+1),
            dayPlusTwo.setDate(startDate.getDate()+2),
            dayPlusThree.setDate(startDate.getDate()+3),
        ]

        setDisplayedDates(newDates);
        // console.log(newDates)
    }

    function handleChangeDate(event,date){
        event.preventDefault();

        let newDate = new Date(date);
        dateObj.setDay(newDate);
    }

    // function handleChangeDate(event,type){
    //     event.preventDefault();
    //     let newDate = new Date();

    //     type==="before"?
    //     newDate.setDate(dateObj.day.getDate() - 1) :
    //     type==="after"?
    //     newDate.setDate(dateObj.day.getDate() + 1) : "";

    //     dateObj.setDay(newDate)
    // }

    function moveSelectedDates(event,type){
        event.preventDefault();


        if(type==="down"){

            let newDates = [...displayedDates];
            let addedDate = new Date();
            addedDate.setDate(new Date(newDates[0]).getDate()-1);
            newDates.unshift(addedDate);
            newDates.pop();

            setDisplayedDates(newDates);

        }else if(type==="up"){

            let newDates = [...displayedDates];
            let addedDate = new Date();
            addedDate.setDate(new Date(newDates[6]).getDate()+1);
            newDates.push(addedDate);
            newDates.shift();

            setDisplayedDates(newDates);
        }
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