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

        nutList.flat().forEach(item=>{
            totalNutrients[item.name]+=item.amount
        });

        this.totalNutrients = totalNutrients;
        return totalNutrients;
    }

    calculagePercentage(chosenNutrients){

        //chosenNutrients is meant to be formatted like : [{name:"Energy",goalAmount:1530},{name:"Protein",goalAmount:75},{name:"Carbs",goalAmount:80}]

        const percentageNutrients = this.totalNutrients
        .filter(item=>Object.keys(chosenNutrients).includes(item.name))
        .map(item=>{
            const goalAmount = chosenNutrients.filter(item=>Object.keys(this.totalNutrients).includes(item.name))[0].goalAmount;
            return (item.amount * 100)/goalAmount;
        })

        this.percentageNutrients = percentageNutrients;
        return percentageNutrients;

    }
}