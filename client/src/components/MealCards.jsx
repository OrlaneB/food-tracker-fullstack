
import { useContext, useEffect, useState } from 'react';
import '../styles/MealCards.css'
import mealsForOneDate from '../context/mealsForOneDate';
const authKey = import.meta.env.VITE_APP_API_KEY;

import Day from '../utilities/classes/DayClass';


import userFriendlyNutrientNames from "../utilities/userFriendlyNutrientNames"
import unitNutrients from '../utilities/measurmentUnitNutrients';
import profileInfoContext from '../context/profileInfo';
import calculateNutrients from '../utilities/calculateNutrients';

import axios from 'axios';

export default function MealCards({currentDay,setCurrentDay}) {
 
    const {profileInfo} = useContext(profileInfoContext);
    // let {meals,nutrients,setMeals,setNutrients,day} = useContext(mealsForOneDate);

    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const [openedMeals,setOpenedMeals]=useState([]);
    const [modifiedMeal,setModifiedMeal]=useState();
    const [removed, setRemoved]=useState([]);
    // const [ingredientLists,setIngredientLists]=useState([]);
    // const [suggestions,setSuggestions]=useState([]);
    const [onFocusInput,setOnFocusInput]=useState(null);

    // const chosenNutrients = [];

    // for(let key in profileInfo.chosenNutrients){
    //   const nutrient = profileInfo.chosenNutrients[key];

    //   chosenNutrients.push(nutrient.name);
    // }

    function handleToggleOpen(index){
      let newList;
      if(openedMeals.includes(index)) { 
        newList = openedMeals.filter(m=>m!==index);
      } else { 
        newList = [...openedMeals,index];
      }

      setOpenedMeals(newList);
    }

    // async function deleteMeal(event,index){
    //   event.preventDefault();

    //   try {

    //     const date = new Date(day).toLocaleDateString('en-CA');

    //     const response = await axios.delete(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.id}/${date}/${index}`)

    //     if(response.status===200){
    //       setMeals(response.data.meals);
    //       setNutrients(response.data.nutrients);
    //     }

    //   } catch(err){
    //     console.log(err)
    //   }
    // } 

    // async function updateMeal(event,index){
    //   event.preventDefault();
    //   let nutrients;

    //   await calculateNutrients(ingredientLists)
    //   .then(result=> {
    //     nutrients=result;
    //   }).catch(err=>{
    //     console.log(err)
    //   })

    //   ingredientLists.map((i)=>{return {[i.name]:Number(i.amount)}})

    //   let ingredients = {};

    //   ingredientLists.forEach((i)=>{
    //     ingredients[i.name] = Number(i.amount);
    //   })

    //   const date = new Date(day).toLocaleDateString('en-CA')

    //   await axios.put(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.id}/${date}`,{
    //     ingredients, nutrients, index
    //   })
    //   .then(response =>{
    //     console.log(response.data.message);
    //     setMeals(response.data.meals);
    //     setNutrients(response.data.nutrients);
    //     setOnFocusInput(null);
    //     setModifiedMeal(null);
    //     setIngredientLists(null);
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }

    function onChangeMealInputs(event,index){
      const {name,value} = event.target;

      let newIngredients = [...ingredientLists];
      newIngredients[index][name] = value;

      setIngredientLists(newIngredients);

      if(name==="name") {
        getSuggestions(value);
        setOnFocusInput(index);
      }
    }

    function turnIntoForm(event,index){
      event.preventDefault();

      setModifiedMeal(index);

      const ingredientArray = [];

      for(let ing in meals[index]){
        const ingredient = {name:ing,amount:meals[index][ing]}
        ingredientArray.push(ingredient)
      }
      

      setIngredientLists(ingredientArray);

    }

    // function deleteAnIngredient (index){
    //   let newIngredients = [...ingredientLists];
    //   newIngredients.splice(index,1);
    //   setIngredientLists(newIngredients);
    // }

    // function addAnIngredient(event){
    //   event.preventDefault();
    //   let newIngredients = [...ingredientLists];
    //   newIngredients.push({name:"",amount:0});
    //   setIngredientLists(newIngredients);
    // }

    function handleClickSuggestion(index, suggestion){
      let newList = [...ingredientLists];
      newList[index].name = suggestion;

      setIngredientLists(newList);
      setOnFocusInput(null);
    }

    function deleteMeals(event,index){

      event.preventDefault();

      const updatedDay = currentDay;
      setCurrentDay(null);

      updatedDay.deleteMeal(profileInfo.id, index, profileInfo.chosenNutrients);
      updatedDay.getMeals(profileInfo.id, profileInfo.chosenNutrients);

      setCurrentDay(updatedDay);
      let newRemoved = [...removed];
      newRemoved.push(index);
      setRemoved(newRemoved);
     
    }

  //   const getSuggestions = debounce(async (inputValue) => {

  //     if (inputValue) {
  //         try {
  //             const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${authKey}`, {
  //                 params: {
  //                     query: inputValue,
  //                     dataType: "Survey (FNDDS)",
  //                     pageSize: 5
  //                 },
  //             });


              
  //             if(response.data.foods) {
  //               let newSuggestions = response.data.foods.map(s=>s.description);
  //               if(newSuggestions) setSuggestions(newSuggestions)
  //             }
              
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     }
  // }, 500);

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return function(...args) {
  //       if (timeoutId) clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => {
  //           func.apply(this, args);
  //       }, delay);
  //   };
  // }


    return (
     <div className='Meals'>
         { currentDay.meals &&
         
         currentDay.meals.filter((m,index)=>!removed.includes(index)).map((meal, index) =>(

           <div key={index} className='mealContainer'>

            {modifiedMeal!==index && 
              <>
              <div id="listContainer">

                <button 
                  style=
                    {openedMeals.includes(index)? {transform:"rotate(90deg)",display:"inline"}:{display:"inline"}} 
                  className='roundButton'
                  onClick={()=>handleToggleOpen(index)}>
                    &gt;
                </button>

                <h3 style={{display:"inline",marginLeft:"10px"}}>
                  Meal #{index+1}
                </h3>

                <button 
                  className='roundButton' 
                  style={{height:"25px",width:"25px",fontSize:"0.8em"}}
                  onClick={(event)=>turnIntoForm(event,index)}>
                    <i className="fi fi-rr-pencil"></i>
                </button>

                <button 
                  className='roundButton' 
                  style={{height:"25px",width:"25px",fontSize:"0.8em"}}
                  onClick={(event)=>deleteMeals(event,index)}>
                    <i className="fi fi-rr-cross-small"></i>
                </button>
                
                { openedMeals.includes(index) &&
                  <ul>
                    {/* {Object.keys(meals[index]).map((item,j)=>(
                      <li key={j}>{item} {meals[index][item]}g</li>
                    ))} */}
                    {meal.getIngredients().map((item,j)=>(
                      <li key={j}>{item.name} {item.amount}g</li>
                    ))}
                  </ul>}

             </div>

             <div className='mealNutrients'>

              {meal.getNutrients(profileInfo.chosenNutrients).map((nut,k)=>(
                <p key={k} style={{backgroundColor:colors[k]}}>
                  <span className='amount'>
                    {nut.amount}
                  </span> <br/>
                    {userFriendlyNutrientNames[nut.name]}
                </p>
              ))}

              

              </div>
              </>
            }

            {modifiedMeal===index && 
            <div className='modified'>

              <h3 style={{display:"inline",marginLeft:"10px"}}>
                Meal #{index+1}
              </h3>

              <form onSubmit={(event)=>event.preventDefault()}>
                {ingredientLists.map((ing,j)=>(
                  <div key={j}>

                    <input 
                      className='ingName' 
                      value={ing.name} 
                      onChange={(event)=>onChangeMealInputs(event,j)} 
                      placeholder='Name of ingredient'
                      name='name' 
                      type='text'/>

                    <input 
                      className='ingAmount' 
                      value={ing.amount} 
                      onChange={(event)=>onChangeMealInputs(event,j)} 
                      name='amount' 
                      type='number'/>g

                    <button 
                      className='roundButton' 
                      onClick={()=>deleteAnIngredient(j)}>
                        <i className='fi fi-rr-cross-small'></i>
                    </button>

                    {onFocusInput===j && suggestions && suggestions.map((s,index)=>(
                      <p key={index} onClick={()=>handleClickSuggestion(j,s)}>{s}</p>
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
                  onClick={(event)=>updateMeal(event,index)}
                >
                    Update the meal
                </button>

              </form>
                
            </div>
            }
             
           </div>

         )
         )} 

         
     </div>
    )
   }