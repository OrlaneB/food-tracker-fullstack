import React, { useState } from 'react';
const authKey = import.meta.env.VITE_APP_API_KEY;
import axios from 'axios'


export default function AddMeal() {
    const [listIngredients, setListIngredients] = useState([]);
    const [nextId, setNextId] = useState(0);


    function handleAddIngredientButton(){
        let newIng = {name:"",numberAmount:"",measurement:"g", id:nextId};
        setListIngredients([...listIngredients, newIng])
        setNextId(nextId+1);
    }

    function handleChangeIngredientForm(event,index){
        const {name,value}=event.target;

        let newList = [...listIngredients];
        newList[index][name]=value;

        setListIngredients(newList);
    }


    function postIngredients(ingList){
        // POST axios
        // data: {ingList}
    }

    function calculateNutrients (listIng){
        // declare var of nutrient1, nutrient2,nutrient3
        // Calculate for all 20 nutrients
        //let totalNutrient1 = 0;
        //Loop through the array listIngredients
        
        //Fetch in API with GET query for the nutrients of the current ingredient => this returns an object
        //.then const {protein, TotalLipidFat, Carbohydrate} = results.data;
            //Get the values from the destructured  variables for example: 'Protein', 'Total lipid (fat)' and 'Carbohydrate, by difference'
            
            //Calculate nutrient amount for that one ingredient based on the amount of ingredient : amountNutrient * amountIngredient / 100
            // add the result of calculation to nutrient total
            // totalNutrient1 += protein * amountIngredient / 100;
            // totalNutrient2 += TotalLipidFat * amountIngredient / 100;
            // totalNutrient3 += Carbohydrate * amountIngredient / 100;

        // Once it loops listIngredient.length-1 break out 

        // Call postMeals() to database Store nutrient totals in the table meals -- POST

        let nutrientsObj = {};

        const requests = listIng.map(ingredient =>
            axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {
              params: {
                query: ingredient.name,
                dataType: "Survey (FNDDS)",
                pageSize: 1, // Limite le nombre de résultats par page si nécessaire
              },
            })
          );
          
          axios.all(requests)
            .then(axios.spread((...responses) => {
        
              responses.forEach((response,index)=>{
                let ingredientNutrients = {};
                response.data[0].foodNutrients.forEach(nut=>{
                    let amountOfIngredient = nut.amount /100;
                    ingredientNutrients[nut.name]=`${amountOfIngredient*listIng[index].numberAmount} ${nut.unitName}`;
                })
                nutrientsObj[response.data[0].description]=ingredientNutrients;
              })

              console.log(nutrientsObj);

              let nutrientMeal = {};

                for(let ing in nutrientsObj){
                        for(let nutrient in nutrientsObj[ing]){
                            let amount = nutrientsObj[ing][nutrient].split(" ")[0];

                            if (nutrientMeal[nutrient]) {
                                nutrientMeal[nutrient] += Number(amount);
                            } else {
                                nutrientMeal[nutrient] = Number(amount);
                            }
                        }
                }
                    
                

                console.log(nutrientMeal)

            }))
            .catch(errors => {
              console.log(errors); // Gère les erreurs
            });

           

    }


    function postMeals(todaysDate,profileid,nutrient1, nutrient2, nutrient3){
        // POST request with params to add meal to meals table
        // use today's date for now and refactor later in the case that a user wants to add meals for previous days 
    }
    

  return (
    <div>
        {/* 
            Title - Add a meal for (date)

            Component for the ingredients inputs (because reusable)
                Input ingredientName - text
                Input numberAmount - number
                Input measurment - dropdown (see in API which ones)
                Delete button to remove the ingredient

            Button add an ingredient
                On click create a new component

            Submit the meal
                On click, goes back to the homepage
                Create a new object Meal and add the ingredients, and calculates the nutrients in each one and in the whole meal

            
        */}


      {/* <listIngredientsContext.Provider value={{listIngredients,setListIngredients}} > */}

        {listIngredients.map((ingredientObj,index)=>(
            // <AddAnIngredient ingredientObj={ingredientObj}  key={ingredientObj.id} />
            <form key={ingredientObj.id}>
                <input type='text' value={ingredientObj.name} name='name' placeholder='Name of ingredient' onChange={(event)=>handleChangeIngredientForm(event,index)}/>
                <input type='number' value={ingredientObj.numberAmount} name='numberAmount' placeholder='Amount'  onChange={(event)=>handleChangeIngredientForm(event,index)}/>g
            </form>
        ))}
        {/* </listIngredientsContext.Provider> */}
        
        <button onClick={()=>calculateNutrients(listIngredients)}>Calculate nutrients</button>
        <button onClick={()=>handleAddIngredientButton()}>Add an ingredient</button>

        <button>Add the meal</button>
    </div>
  )
}