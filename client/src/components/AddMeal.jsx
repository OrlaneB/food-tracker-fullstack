import React, { useContext, useEffect, useState } from 'react';
const authKey = import.meta.env.VITE_APP_API_KEY;
import axios from 'axios'

import "../styles/AddAMeal.css"
import NavBar from './NavBar';
import loginAuth from '../context/loginAuth';
import { useNavigate } from 'react-router-dom';

export default function AddMeal() {
    const [listIngredients, setListIngredients] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [suggestions,setSuggestions] = useState([]);
    const [onFocusInput, setOnFocusInput] = useState(null);

    const {checkIfLoggedIn}= useContext(loginAuth);

    // const navigate = useNavigate();


    

    let today = new Date();

    const nutrientList = ["Energy","Protein","Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Sugars, total including NLEA","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Omega-3 Fatty Acids (EPA, DHA)"];


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

        if(name==="name") {
          getSuggestions(value);
          setOnFocusInput(index);
        }
    }

    function handleClickSuggestion(index, suggestion){
      let newList = [...listIngredients];
      newList[index]["name"] = suggestion;

      setListIngredients(newList);
      setOnFocusInput();
    }

    // function postIngredients(ingList){
    //     // POST axios
    //     // data: {ingList}
    // }

    async function calculateNutrients(listIng) {
      let nutrientsObj = {};
      let nutrientMeal = {};
  
      // Create an array of axios GET requests
      const requests = listIng.map(ingredient =>
          axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {
              params: {
                  query: ingredient.name,
                  dataType: "Survey (FNDDS)",
                  pageSize: 1, // Limit the number of results per page if necessary
              },
          })
      );
  
      try {
          // Wait for all requests to complete
          const responses = await axios.all(requests);
  
          responses.forEach((response, index) => {
              let ingredientNutrients = {};
  
              response.data[0].foodNutrients
                  .filter(nut => nutrientList.includes(nut.name))
                  .forEach(nut => {
                      let amountOfIngredient = nut.amount / 100;
                      ingredientNutrients[nut.name] = `${amountOfIngredient * listIng[index].numberAmount} ${nut.unitName}`;
                  });
  
              nutrientsObj[response.data[0].description] = ingredientNutrients;
          });
  
          // Calculate the total nutrients
          for (let ing in nutrientsObj) {
              for (let nutrient in nutrientsObj[ing]) {
                  let amount = nutrientsObj[ing][nutrient].split(" ")[0];
  
                  if (nutrientMeal[nutrient]) {
                      nutrientMeal[nutrient] += Number(amount);
                  } else {
                      nutrientMeal[nutrient] = Number(amount);
                  }
              }
          }
  
          return nutrientMeal; // Return the calculated nutrients
  
      } catch (errors) {
          console.log(errors); // Handle errors
          return "Did not work";
      }
  }
  

    // console.log(calculateNutrients(listIngredients))

    function deleteIngredient(event,index){
      event.preventDefault();

      let newList = [...listIngredients];
      newList.splice(index,1);
      setListIngredients(newList);
    }

    async function addWholeMealToDB(){
        //Create a new meal
      let mealID = await postMeal();
      // console.log(mealID.data.data[0]["max(meal_id)"]);
      mealID=mealID.data.data[0]["max(meal_id)"]
      
      if(mealID){
        //Add ingredients to the meal
      postIngredients(mealID);

      //Add nutrients to the meal
      postNutrients(mealID);
      }
      

    }

    async function postMeal(){
      //Need -> Profile_id (params), date(body)

      const profile_id = 1;
      const date = new Date();
      console.log("Post Meal");

      try{
        const mealID = await axios.post(`http://localhost:5000/api/meals/${profile_id}`, {
          date
        });

        console.log("Posted a meal worked!");
        return mealID;
      }
      catch(err){
        console.log(err);
      }
    }

    async function postIngredients(mealID){
      try {

        await axios.post(`http://localhost:5000/api/meals/ingredients/${mealID}`,{
          ingredientsList : listIngredients
        })

        console.log("Posted ingredients worked!")

      } catch(err){
        console.log(err);
      }
    }

    async function postNutrients(mealID){
      let nutrientsListCalculated = await calculateNutrients(listIngredients);
      console.log(nutrientsListCalculated)

      try{
        await axios.post(`http://localhost:5000/api/meals/nutrients/${mealID}`,{
          nutrientsList:nutrientsListCalculated
        })

        console.log("Post nutrients worked!")
      } catch(err){
        console.log(err);
      }
    }

    const getSuggestions = debounce(async (inputValue) => {
      if (inputValue) {
          try {
              const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${authKey}`, {
                  params: {
                      query: inputValue,
                      dataType: "Survey (FNDDS)",
                      pageSize: 5
                  },
              });

              // let newSuggestions = response.data.map(obj=>obj.description);
              
              if(response.data.foods) {
                let newSuggestions = response.data.foods.map(s=>s.description);
                setSuggestions(newSuggestions)
                // console.log(newSuggestions)
              }
              
          } catch (err) {
              console.log(err);
          }
      }
  }, 500);
  


    function debounce(func, delay) {
      let timeoutId;
      return function(...args) {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
              func.apply(this, args);
          }, delay);
      };
    }
  
    useEffect(()=>{
      checkIfLoggedIn()
    }, [])
    

  return (
    <>

      <div id="AddAMeal">
      <p style={{fontFamily:"impact"}}>foodtracker</p>
      <hr style={{width:"60%", marginBottom:"30px"}} />
      <h2>Log the meal for {today.toDateString()}</h2>
        {listIngredients.map((ingredientObj,index)=>(
            // <AddAnIngredient ingredientObj={ingredientObj}  key={ingredientObj.id} />
            <form key={ingredientObj.id}>
                <input type='text' value={ingredientObj.name} name='name' placeholder='Name of ingredient' onChange={(event)=>handleChangeIngredientForm(event,index)} />

                
                
                <input type='number' value={ingredientObj.numberAmount} name='numberAmount' placeholder='Amount'  onChange={(event)=>handleChangeIngredientForm(event,index)} onFocus={()=>setOnFocusInput(null)}/>g

                <button className='deleteIngButton' onClick={(event)=>deleteIngredient(event,index)}>x</button>

                {onFocusInput===index && suggestions &&
                  <div className='suggestionsContainer'>
                    {suggestions.map(s=>(
                    <p onClick={()=>handleClickSuggestion(index,s)} key={s}>{s}</p>
                    ))}
                  </div>
                }
            </form>
        ))}

        {!listIngredients[0] &&
          <p id='emptyIngList'>Add the ingredients of this meal.</p>
        }
        
        <button onClick={()=>calculateNutrients(listIngredients)}>Calculate nutrients</button>
        <button onClick={()=>handleAddIngredientButton()} id='addIngButton'> Add an ingredient</button>

        <button id='addMealButton' onClick={()=>addWholeMealToDB()}>Add the meal</button>

        </div>
        <NavBar />
    </>

  )
}