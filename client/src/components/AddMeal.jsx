/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext } from 'react';
import NavBar from "./NavBar"


// const ingredientsContext = createContext(null);
const listIngredientsContext = createContext(null);


function AddAnIngredient({ingredientObj}){
    const [ingredient,setIngredient]=useState(ingredientObj)

    const {listIngredients,setListIngredients} = useContext(listIngredientsContext);

    function handleChange(event){
        //Input value is connected to newIngredients keys.

        //Create a shallow copy of the object
        let newIngredient = {...ingredient};
        //Get the name of input to change the correct value
        console.log(event.target,event.target.name)
        let {name,value} = event.target;
        console.log(name,value)
        //Change the new object
        newIngredient[name]=value;
        //Update setNewIngredient
        setIngredient(newIngredient);
        console.log(ingredient.id);

        // cbUpdateListIngredients(newIngredient);
         //Create a shallow copy of list ingredients

         let newList = [...listIngredients];
        
         //Find in the list this ingredient by the id+
         let indexIng = newList.findIndex((item)=>item.id===newIngredient.id);
         if(indexIng!==-1){
             //Update with the parameter of the function
             newList[indexIng]=newIngredient;
             setListIngredients(newList);
         } 
         
         console.log(listIngredients);
        
    }

    return(
        <form className="AddIngredient">
            <input type='text' name="name" value={ingredient.name} onChange={(event)=>handleChange(event)} placeholder='Name of ingredient' />
            <input type='number' name="numberAmount" value={ingredient.numberAmount} onChange={(event)=>handleChange(event)} placeholder='How much' />
            <select name="measurement" value={ingredient.measurement} onChange={(event)=>handleChange(event)}>
                <option>g</option>
                <option>portion</option> {/*Double check API for the correct options*/}
            </select>
        </form>
    )
}


export default function AddMeal() {
    const [listIngredients, setListIngredients] = useState([]);
    const [nextId, setNextId] = useState(1);


    function handleAddIngredientButton(){
        //Called when a new component is created (+ button)
        let newIng = {name:"",numberAmount:"",measurement:"g", id:nextId};
        setListIngredients([...listIngredients, newIng])
        //adds an ID to the ingredient object with nextId
        //increase nextId
        setNextId(nextId+1);
    }

    function postIngredients(ingList){
        // POST axios
        // data: {ingList}
    }

    function calculateNutrients (){
        // declare var of nutrient1, nutrient2,nutrient3
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

    }

    // function postMeals(todaysDate,profileid,nutrient1, nutrient2, nutrient3)
    // POST request with params to add meal to meals table
    // use today's date for now and refactor later in the case that a user wants to add meals for previous days 

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


      <listIngredientsContext.Provider value={{listIngredients,setListIngredients}} >

        {listIngredients.map((ingredientObj)=>(
            <AddAnIngredient ingredientObj={ingredientObj}  key={ingredientObj.id} />

        ))}
        </listIngredientsContext.Provider>
        
        <button onClick={()=>handleAddIngredientButton()}>Add an ingredient</button>

        <button>Add the meal</button>

        <NavBar/>
    </div>
  )
}


// ingredientObj={ingredientObj}