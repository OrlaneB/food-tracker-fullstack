export default class Meal {
    constructor(ingredients,nutrients) {
        this.ingredients = ingredients;
        this.nutrients = nutrients;
    }

    getIngredients(){
        return this.ingredients;
    }

    getNutrients(){
        return this.nutrients;
    }
}