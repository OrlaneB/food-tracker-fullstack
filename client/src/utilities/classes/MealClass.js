export default class Meal {
    constructor(ingredients){
        this.ingredients = ingredients;
    }

    getIngredients(){
        return this.ingredients;
    }
}

module.exports = Meal;