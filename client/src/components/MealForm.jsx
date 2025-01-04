import React, { useContext, useEffect, useState } from 'react'
import MealConstruction from '../utilities/classes/MealConstructionClass';
import profileInfoContext from '../context/profileInfo';
import mealsForOneDate from '../context/mealsForOneDate';

import "../styles/MealForm.css"


export default function MealForm({mealIndex=null,ing=null}) {

    const {profileInfo} = useContext(profileInfoContext)
    const {currentDay} = useContext(mealsForOneDate)

    const authKey = import.meta.env.VITE_APP_API_KEY;

    const [meal,setMeal] = useState(null);
    const [onFocusInput,setOnFocusInput] = useState(null);
    const [suggestions,setSuggestions] = useState([]);

    function createMealObject(){
        console.log(ing);
        const newMeal = new MealConstruction(ing);
        setMeal(newMeal);
        console.log(newMeal)
    }

    function addAnIngredient(event){
      event.preventDefault();

      const newMeal = new MealConstruction(meal.addIngredient())
      setMeal(newMeal)
      
    }

    async function handleChange(event,index){
      const {name,value} = event.target;

      const newMeal = new MealConstruction(meal.ingredients);
      newMeal.ingredients[index][name]=value;

      setMeal(newMeal);

      if(name==="name" && value.length>=3){
        setOnFocusInput(index);
        const newSuggestions = await meal.getSuggestionsFromAPI(value,authKey)

        if(newSuggestions.length>0){
          setSuggestions(newSuggestions)
        }
        
      }
    }

    function clickSuggestion(index,suggestion){
      const newMeal = new MealConstruction(meal.ingredients);
      newMeal.ingredients[index].name = suggestion;
      setMeal(newMeal);
      setSuggestions([]);
      setOnFocusInput(null);
    }

    useEffect(()=>{
        createMealObject()
    },[])

  return (
    <form id='MealForm'>
        {meal && meal.ingredients.map((ing,index)=>(
                  <div key={index}>

                    <input 
                      className='ingName' 
                      value={ing.name} 
                      onChange={(event)=>handleChange(event,index)} 
                      placeholder='Name of ingredient'
                      name='name' 
                      type='text'/>

                    <input 
                      className='ingAmount' 
                      value={ing.amount} 
                      onChange={(event)=>handleChange(event,index)}  
                      name='amount' 
                      type='number'/>g

                    <button 
                      className='roundButton' 
                      onClick={()=>meal.deleteIngredient(index)}>
                        <i className='fi fi-rr-cross-small'></i>
                    </button>

                    {onFocusInput===index && suggestions && suggestions.map((s,i)=>(
                      <p key={i} className='suggestions'
                        onClick={()=>clickSuggestion(index,s)}
                      >{s}</p>
                    ))}

                  </div>
                ))}

                <button 
                  className='textButton' 
                  onClick={(event)=>addAnIngredient(event)}>
                    Add an ingredient
                </button>

                <button
                  className='importantTextButton'
                  onClick={()=>meal.sendToDB(currentDay.date,profileInfo.id,authKey,mealIndex)}
                >
                    {meal ? meal.functionnality[0].toUpperCase()+meal.functionnality.slice(1) : ""}
                </button>
    </form>
  )
}
