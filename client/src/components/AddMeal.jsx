/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext } from 'react';

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
    </div>
  )
}


// ingredientObj={ingredientObj}