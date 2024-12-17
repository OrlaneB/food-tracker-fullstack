export default class Meal {
    constructor(ingredients,nutrients){
        this.ingredients = ingredients;
        this.nutrients = nutrients;
    }

    getIngredients(){
        return this.ingredients;
    }

    getNutrients(chosenNutrients){

        if(!chosenNutrients){
            return this.nutrients;
        } else {
            const chosenNutrientNames = chosenNutrients.map(n=>n.name)
            return this.nutrients.filter(n=>chosenNutrientNames.includes(n.name));
        }
    }

    
}

// module.exports = Meal;