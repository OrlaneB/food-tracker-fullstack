import userFriendlyNutrientNames from "./userFriendlyNutrientNames"

export default function getScientificName(value){
    
    return Object.keys(userFriendlyNutrientNames)
    .find(key => userFriendlyNutrientNames[key]===value)
}