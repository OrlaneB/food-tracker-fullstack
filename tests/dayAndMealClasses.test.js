const Meal = require("../client/src/utilities/classes/MealClass");
const Day = require("../client/src/utilities/classes/DayClass");

let day;
const meals = [
    [
        {
            "name": "Quinoa",
            "amount": 100
        },
        {
            "name": "Broccoli",
            "amount": 75
        },
        {
            "name": "Chicken Breast",
            "amount": 150
        }
    ],
    [
        {
            "name": "Beef",
            "amount": 150
        },
        {
            "name": "Brown Rice",
            "amount": 120
        },
        {
            "name": "Red pepper",
            "amount": 80
        }
    ]
]
const meal1 =  [
    {
        "name": "Quinoa",
        "amount": 100
    },
    {
        "name": "Broccoli",
        "amount": 75
    },
    {
        "name": "Chicken Breast",
        "amount": 150
    }
]
const meal2 = [
    {
        "name": "Beef",
        "amount": 150
    },
    {
        "name": "Brown Rice",
        "amount": 120
    },
    {
        "name": "Red pepper",
        "amount": 80
    }
]

const totalNut = [{
            "name": "Energy",
            "amount": 450
        },
        {
            "name": "Protein",
            "amount": 27
        },
        {
            "name": "Iron, Fe",
            "amount": 11
        },
        {
            "name": "Zinc, Zn",
            "amount": 11
        },
        {
            "name": "Sodium, Na",
            "amount": 500
        },
        {
            "name": "Calcium, Ca",
            "amount": 270
        },
        {
            "name": "Cholesterol",
            "amount": 70
        },
        {
            "name": "Folate, DFE",
            "amount": 270
        },
        {
            "name": "Potassium, K",
            "amount": 750
        },
        {
            "name": "Total Sugars",
            "amount": 27
        },
        {
            "name": "Magnesium, Mg",
            "amount": 160
        },
        {
            "name": "Vitamin A, RAE",
            "amount": 620
        },
        {
            "name": "Total lipid (fat)",
            "amount": 20
        },
        {
            "name": "Vitamin D (D2 + D3)",
            "amount": 7
        },
        {
            "name": "Fiber, total dietary",
            "amount": 10
        },
        {
            "name": "Vitamin K (phylloquinone)",
            "amount": 70
        },
        {
            "name": "Carbohydrate, by difference",
            "amount": 65
        },
        {
            "name": "Vitamin E (alpha-tocopherol)",
            "amount": 8.5
        },
        {
            "name": "Vitamin C, total ascorbic acid",
            "amount": 95
        },
        {
            "name": "Fatty acids, total polyunsaturated",
            "amount": 6
        }]



describe("The Day class", ()=>{
    beforeEach(()=>{
        day = new Day("Mon Nov 25 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)")
    })

    test("The meals by default is empty array", ()=>{
        expect(day.meals).toStrictEqual([]);
    });

    

    test("Should have 2 meals", ()=>{
        day.addMeals(meals);
        expect(day.meals.length).toBe(2);
    })

    test("The addMeal() has the right info", ()=>{
        day.addMeals(meals);

        expect(day.meals[0].getIngredients()).toStrictEqual(meal1);
        expect(day.meals[1].getIngredients()).toStrictEqual(meal2);
    })
})

let meal;
describe("The Meal class", ()=>{
    beforeEach(()=>{
        meal = new Meal(meals)
    })
    test("Should have a correct ingredients property", ()=>{
        expect(meal.ingredients).toStrictEqual(meals);
    })

    test("The getIngredients method works", ()=>{
        expect(meal.getIngredients()).toStrictEqual(meals);
    })
})

describe("The getMeals() method", ()=>{
    beforeEach(()=>{
        day = new Day("Mon Nov 25 2024 18:40:24 GMT+0100 (heure normale d’Europe centrale)")
    })

    test("Should create 2 meals", async ()=>{
        await day.getMeals(1);

        expect(day.meals.length).toBe(2);
    })

    test("Should have the right meal info", async ()=>{
        await day.getMeals(1);

        expect(day.meals[0].getIngredients()).toStrictEqual(meal1);
        expect(day.meals[1].getIngredients()).toStrictEqual(meal2);
    })

    test("TotalNutrients should have 20 items", async ()=>{
        await day.getMeals(1);

        expect(day.getTotalNutrients().length).toBe(20);
    })

    test("Should have the right totalNutrients", async ()=>{
        await day.getMeals(1);


        day.getTotalNutrients().map(nut=>{
            expect(nut.amount).toBe(totalNut.find(i=>i.name===nut.name).amount)
        })
    })

    test("Should not calculate nutrients if chosenNutrients is null", async()=>{
        await day.getMeals(1,null);

        expect(day.getPercentageNutrients()).toBeNull();
    })

    test("Should have 3 percentage items if chosenNutrients is not null", async()=>{
        const CN = [{name:"Energy",goalAmount:4500},{name:"Protein",goalAmount:270},{name:"Carbohydrate, by difference",goalAmount:130}]
        await day.getMeals(1,CN);

        expect(day.getPercentageNutrients().length).toBe(3);
    })

    test("Should have the correct percentages", async()=>{
        const CN = [{name:"Energy",goalAmount:450},{name:"Protein",goalAmount:270},{name:"Carbohydrate, by difference",goalAmount:130}]
        await day.getMeals(1,CN);

        expect(day.getPercentageNutrients().find(n=>n.name==="Energy").percentage).toBe(100);
        expect(day.getPercentageNutrients().find(n=>n.name==="Protein").percentage).toBe(10);
        expect(day.getPercentageNutrients().find(n=>n.name==="Carbohydrate, by difference").percentage).toBe(50);
    })

})