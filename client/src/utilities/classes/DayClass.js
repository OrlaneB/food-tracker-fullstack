import userFriendlyNutrientNames from "../userFriendlyNutrientNames";
import Meal from "./MealClass";

import axios from 'axios'

export default class Day {
    constructor(date){
        this.date=date;
        this.totalNutrients = null;
        this.percentageNutrients = null;
        this.meals = [];
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


    addMeals(ingredients){
        ingredients.forEach(meal=>{
            const m = new Meal(meal);
            this.meals.push(m);
        });

        return this.meals;
    }

    async getMeals(profile_id, chosenNutrients){
        const date = new Date(this.date).toLocaleDateString('en-CA');

        try {
            const response = await axios.get(`http://localhost:5000/api/meals/${profile_id}/${date}`);

            this.addMeals(response.data.meals);
            this.calculateTotalNutrients(response.data.nutrients);

            if(chosenNutrients) this.calculatePercentage(chosenNutrients);
        } catch(err){
            console.log(err);
        }
    }

    async deleteMeal(profile_id,index, chosenNutrients){
        const date = new Date(this.date).toLocaleDateString('en-CA');

        try {
            const response = axios.delete(`http://localhost:5000/api/meals/${profile_id}/${date}/${index}`)

            this.meals = [];
            this.addMeals((await response).data.meals);
            this.calculateTotalNutrients((await response).data.nutrients);

            if(chosenNutrients) this.calculatePercentage(chosenNutrients);
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = Day;