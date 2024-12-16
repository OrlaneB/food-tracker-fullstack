import Meal from "./MealClass";

import calculateNutrients from "../calculateNutrients";
import axios from "axios";

export default class MealConstruction extends Meal{
    constructor(ingredients){

        if(!ingredients){
            super([{name:"",amount:0}]);
            this.functionnality = "create";
        } else {
            super(ingredients);
            this.functionnality = "update";
        }

        this.suggestions = [];
    }

    //Ingredients is an array of objects like that :
    // {name:"Potato",amount : 20}

    getSuggestions(){
        return this.suggestions;
    }

    addIngredient(){
        this.ingredients.push({name:"",amount:0});
        return this.ingredients;
    }

    deleteIngredient(index){
        if(index>=0 && index<this.ingredients.length){
            this.ingredients.splice(index,1);
        } else {
            console.log("Index is uncorrect")
        }
        return this.ingredients;
    }

    debounce(func,delay){
        let timeoutId;
        return function(...args) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    async getSuggestionsFromAPI(inputValue,authKey){

        this.debounce(
            
            async()=>{
                if(inputValue) {
                    
                    try {
                        const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${authKey}`, {
                            params : {
                                query: inputValue,
                                dataType: "Survey (FNDDS)",
                                pageSize: 5
                            },
                        });

                        if(response.data.foods){
                            this.suggestions = response.data.foods.map(s=>s.description);
                        }
                    } catch(err){
                        console.log(err);
                    }
                }
            },500);
        // }
    }

    async updateMeal(profile_id,index,date,ingredients,nutrients){

        await axios.put(`http://localhost:5000/api/meals/${profile_id}/${date}`,{
            ingredients:ingredients,
            nutrients:nutrients,
            index
        })
        .then(response =>{
            console.log(response.data.message);
            return true;
        }).catch(err=>{
            console.log(err);
            return false;
        })

    }

    async createMeal(date,nutrients,ingredients,profile_id){



        await axios.post(`http://localhost:5000/api/meals/${profile_id}`,{
            date,
            nutrients,
            ingredients
        })
        .then(response =>{
            console.log(response.data.message);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async sendToDB(day,profile_id,authKey,index){
        const {date,ingredients,nutrients} = await this.formatInfo(day,authKey);

        if(this.functionnality==="create"){
            await this.createMeal(date,nutrients,ingredients,profile_id);
        } else if(this.functionnality==="update"){
            await this.updateMeal(profile_id,index,date,ingredients,nutrients);
        } else {
            console.log("The functionality is not correct.")
        }
    }

    async formatInfo(day,authKey){
        let nutrients;

        await calculateNutrients(this.ingredients,authKey)
        .then(result=>{
            nutrients=result;
        }).catch(err=>{
            console.log(err);
        })


        let ingredients = {};

        this.ingredients.forEach(i=>{
            ingredients[i.name]=Number(i.amount);
        })

        const date = new Date(day).toLocaleDateString('en-CA')

        return {nutrients,ingredients,date}
    }


}

module.exports = MealConstruction;