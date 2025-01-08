import { DateTime } from "luxon";

export default function createDisplayedDates(currentDay){
    console.log(currentDay)
    // const dateObj = new Date(currentDay);
    //         let startDate = DateTime.local(dateObj.getFullYear(),dateObj.getMonth()+1,dateObj.getDate());
    const startDate = DateTime.fromISO(currentDay);
    console.log(startDate)
    
            return [
                startDate.minus({days:3}).toISODate(),
                startDate.minus({days:2}).toISODate(),
                startDate.minus({days:1}).toISODate(),
                currentDay,
                startDate.plus({days:1}).toISODate(),
                startDate.plus({days:2}).toISODate(),
                startDate.plus({days:3}).toISODate(),
            ]
}