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
            return <span>&#10003;</span>;
        } else {
            return "";
        }
    }

  return (
        <p>
            {Math.round(totalNutrientsAmount*100)/100}/
            {chosenNutrientsAmount}
            {unitNutrients[nut.name]} {checkGoal()}
        </p>

  )
}
