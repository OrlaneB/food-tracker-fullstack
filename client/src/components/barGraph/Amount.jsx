import React from 'react'
import unitNutrients from '../../utilities/measurmentUnitNutrients'

export default function Amount({nut,currentDay,chosenNutrients}) {

    const totalNutrientsAmount = currentDay.totalNutrients.find(n=>n.name===nut.name).amount;
    const chosenNutrientsAmount = chosenNutrients.find(n=>n.name===nut.name).amount;
    const goal = chosenNutrients.find(n=>n.name===nut.name).goal

    function checkGoal(){
        if(
            (goal==="Less than" && totalNutrientsAmount<chosenNutrientsAmount) ||
            (goal==="More than" && totalNutrientsAmount>chosenNutrientsAmount) ||
            (goal==="Equals" && (Math.abs(totalNutrientsAmount - chosenNutrientsAmount) <= 0.08 * chosenNutrientsAmount))
        ) {
            return <span>Great job &#10003;</span>;

        } else if(goal==="Less than" ||
            (goal==="Equals" && chosenNutrientsAmount<totalNutrientsAmount)
        ){

            const difference = Math.round(totalNutrientsAmount-chosenNutrientsAmount);

            return <span>Over by {difference}{unitNutrients[nut.name]}</span>

        } else if(goal==="More than" ||
            (goal==="Equals" && chosenNutrientsAmount>totalNutrientsAmount)){

            const difference = Math.round(chosenNutrientsAmount-totalNutrientsAmount);

            return <span>{difference}{unitNutrients[nut.name]} short</span>

        } else {
            return "";
        }
    }

  return (
        <>
            <p>
            {Math.round(totalNutrientsAmount*100)/100}/
            {chosenNutrientsAmount}
            {unitNutrients[nut.name]}
            </p>

            <p style={{fontStyle:"italic",margin:0}}
            className='checkGoal'>{checkGoal()}</p>
        </>

  )
}
