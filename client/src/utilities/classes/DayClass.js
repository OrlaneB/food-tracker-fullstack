import userFriendlyNutrientNames from "../userFriendlyNutrientNames";

export default class Day {
    constructor(date){
        this.date=date;
        this.totalNutrients = null;
        this.percentageNutrients = null;
    }

    getDate(){
        return this.date;
    }

    getTotalNutrients(){
        return this.totalNutrients;
    }

    getPercentageNutrients(){
        return this.percentageNutrients;
    }

    calculateTotalNutrients(nutList){

        const totalNutrients = Object.keys(userFriendlyNutrientNames).map(item=>{
            return {name:item,amount:0}
        });


        nutList.flat(Infinity).forEach(item=>{
            totalNutrients.find(e=>e.name===item.name).amount+=Number(item.amount);
        });

        this.totalNutrients = totalNutrients;
        return totalNutrients;
    }

    calculatePercentage(chosenNutrients){

        //chosenNutrients is meant to be formatted like : [{name:"Energy",goalAmount:1530},{name:"Protein",goalAmount:75},{name:"Carbs",goalAmount:80}]


        const chosenNutrientNames = chosenNutrients.map(item=>item.name);

        const percentageNutrients = this.totalNutrients
        .filter(item=>chosenNutrientNames.includes(item.name))
        .map(item=>{
            const goalAmount = chosenNutrients.find(n=>n.name===item.name).goalAmount;
            const percentage = (item.amount * 100)/goalAmount;
            return {name:item.name,percentage}
        })

        this.percentageNutrients = percentageNutrients;
        return percentageNutrients;

    }
}

module.exports = Day;