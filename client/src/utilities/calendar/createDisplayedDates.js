import { DateTime } from "luxon";

export default function createDisplayedDates(currentDay){
    const dateObj = new Date(currentDay);
            let startDate = DateTime.local(dateObj.getFullYear(),dateObj.getMonth()+1,dateObj.getDate());
    
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