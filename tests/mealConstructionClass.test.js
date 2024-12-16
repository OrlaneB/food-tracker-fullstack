const MealConstruction = require("../client/src/utilities/classes/MealConstructionClass");

const Day = require("../client/src/utilities/classes/DayClass");
const authKey = "rG8Hc3qkWe2kzXgTJ4DaHsPjJpaRQkouTsphkEHE"

describe("MealConstruction class",()=>{
    let meal;
    let meal2;

    describe("The constructor method",()=>{
        beforeEach(()=>{
            meal = new MealConstruction([{name:"Potato",amount:150},{name:"Ketchup",amount:50}]);
            meal2 = new MealConstruction();
        })

        test("Creates ingredients if not null",()=>{
            expect(meal.getIngredients()).toStrictEqual([{name:"Potato",amount:150},{name:"Ketchup",amount:50}])
        })

        test("Creates ingredients if null",()=>{
            expect(meal2.getIngredients()).toStrictEqual([{name:"",amount:0}]);
        })

        test("Functionnality should be update",()=>{
            expect(meal.functionnality).toBe("update")
        })

        test("Functionality should be create",()=>{
            expect(meal2.functionnality).toBe("create")
        })

        test("Should create an empty array for suggestions",()=>{
            expect(meal.suggestions).toStrictEqual([]);
            expect(meal2.suggestions).toStrictEqual([]);
        })
    })


    describe("Modifying ingredients array",()=>{
        beforeEach(()=>{
            meal = new MealConstruction([{name:"Potato",amount:150},{name:"Ketchup",amount:50}]);
            meal2 = new MealConstruction();
        })

        test("The addIngredient() method should add one ingredient",()=>{
            const mealsBefore1 = meal.getIngredients().length;
            const mealsBefore2 = meal2.getIngredients().length;

            meal.addIngredient();
            meal2.addIngredient();

            expect(meal.getIngredients().length).toBe(mealsBefore1+1);
            expect(meal2.getIngredients().length).toBe(mealsBefore2+1);
        })

        test("The addIngredient() method should add an empty ingredient",()=>{
            meal.addIngredient();
            meal2.addIngredient();

            const lengthMeal = meal.getIngredients().length;
            const lengthMeal2 = meal2.getIngredients().length;

            expect(meal.getIngredients()[lengthMeal-1]).toStrictEqual({name:"",amount:0});
            expect(meal2.getIngredients()[lengthMeal2-1]).toStrictEqual({name:"",amount:0});
        })

        test("The deleteIngredient() method should remove an item", ()=>{
            const mealsBefore1 = meal.getIngredients().length;
            const mealsBefore2 = meal2.getIngredients().length;

            meal.deleteIngredient(0);
            meal2.deleteIngredient(0);

            expect(meal.getIngredients().length).toBe(mealsBefore1-1);
            expect(meal2.getIngredients().length).toBe(mealsBefore2-1);
        })

        test("The deleteIngredient() method should remove the right element",()=>{
            meal.deleteIngredient(0);
            meal2.deleteIngredient(0);

            expect(meal.getIngredients()).toStrictEqual([{name:"Ketchup",amount:50}]);
            expect(meal2.getIngredients()).toStrictEqual([]);

        })

        test("If index is incorrect",()=>{
            const test1 = meal.deleteIngredient(36);
            const test2 =meal.deleteIngredient(-2);

            expect(test1).toStrictEqual([{name:"Potato",amount:150},{name:"Ketchup",amount:50}]);
            expect(test2).toStrictEqual([{name:"Potato",amount:150},{name:"Ketchup",amount:50}]);


            meal2.deleteIngredient(0);
            const test3 = meal2.deleteIngredient(0);

            expect(test3).toStrictEqual([]);
        })

    })

    describe("The getSuggestions() method", ()=>{
        

        beforeEach(()=>{
            meal = new MealConstruction();
        })
        

        test("Before, should have empty array",()=>{
            expect(meal.getSuggestions()).toStrictEqual([]);
        })

        test("Should create 5 items in suggestions", async()=> {
            await meal.getSuggestionsFromAPI("pot",authKey);
            console.log(meal.suggestions);

            expect(meal.getSuggestions().length).toBe(5);
        })

        test("Should replace suggestions", async ()=>{
            await meal.getSuggestionsFromAPI("pot",authKey);
            const before = meal.getSuggestions();

            await meal.getSuggestionsFromAPI("cho",authKey);
            expect(meal.getSuggestions()).not.toStrictEqual(before);
        })
    })

    describe("The sendToDB() method for create",()=>{
        let day;
        const date = "Fri Dec 13 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)"

        beforeEach(()=>{
            day = new Day("Fri Dec 13 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)");

            meal = new MealConstruction();
            meal.ingredients = [{name:"Banana, raw",amount:15},{name:"Croissant, chocolate",amount:80}]
        })

        test("Should have right ingredients",()=>{
            expect(meal.getIngredients()).toStrictEqual([{name:"Olive oil",amount:15},{name:"Lettuce, raw",amount:80},{name:"Egg Benedict",amount:100}])
        })

        test("Day should have two meals",async()=>{
            await day.getMeals(1)
            const before = day.meals.length;

            expect(before).toBe(2);
        })

        test("Functionnality should be create",()=>{
            expect(meal.functionnality).toBe("create");
        })

        test("Should add one meal to database", async()=>{
            await day.getMeals(1)
            const before = day.meals.length;

            await meal.sendToDB(date,1,authKey);

            await day.getMeals(1)

            expect(day.meals.length).toBe(before+1);
        })
    })


    describe("The sendToDB() method for update",()=>{
        let day;
        const date = "Fri Dec 13 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)"

        beforeEach(()=>{
            day = new Day("Fri Dec 13 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)");

            meal = new MealConstruction([{name:"Banana, raw",amount:15},{name:"Croissant, chocolate",amount:80}]);
            meal.ingredients = [{name:"Banana, raw",amount:15},{name:"Croissant, chocolate",amount:110}]
        })

        test("Functionnality should be update",()=>{
            expect(meal.functionnality).toBe("update");
        })

        test("Day should have 3 meals before and after", async ()=>{
            await day.getMeals(1);
            expect(day.meals.length).toBe(3);

            await meal.sendToDB(date,1,authKey,2);

            await day.getMeals(1);
            expect(day.meals.length).toBe(3);
        })

        test("The meal should have been updated", async()=>{
            await meal.sendToDB(date,1,authKey,2);

            await day.getMeals(1);
            expect(day.meals[2].getIngredients()).toStrictEqual([{name:"Banana, raw",amount:15},{name:"Croissant, chocolate",amount:110}]);
        })
    })
})