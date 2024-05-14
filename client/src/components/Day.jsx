/* eslint-disable no-unused-vars */
import { useState } from "react"
import '../styles/Day.css'
// import meals for corresponding day

// create a new data object to store current date
const currentDate = new Date();

// The day component renders the meals that have been inputted for that day

export default function Day() {
    // initialize the state of meals
    const [meal, setMeal] = useState({
        id : 1,
        date : currentDate.toDateString,
        portions : [],
        ingredients : [],
        nutrients : ['fat', 'protein', 'carbohydrates'],
    })

    //Declare today's date
    const today = new Date();// throwing an error "Maximum callstack exceeded"
   
    return (
        <div className='Day'>
            <button>←</button>
            <p>{today.toDateString()}</p>
            <button>→</button>
        </div>    
    )                                
}