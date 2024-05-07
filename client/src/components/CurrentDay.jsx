/* eslint-disable no-unused-vars */
import { useState } from "react"
// import meals for corresponding day

// create a new data object to store current date
const currentDate = new Date();

// initialize the state of meals
const [meal, setMeal] = useState({
    id : 1,
    date : currentDate.toDateString,
    portions : [],
    ingredients : [],
    nutrients : ['fat', 'protein', 'carbohydrates'],
})

// The day component renders the meals that have been inputted for that day