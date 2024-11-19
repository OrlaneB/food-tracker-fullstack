import React, { useState, useContext } from 'react';
const authKey = import.meta.env.VITE_APP_API_KEY;
import axios from 'axios'

import "../styles/AddAMeal.css"
import { useNavigate } from 'react-router-dom';
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import profileInfoContext from '../context/profileInfo';

export default function AddMeal() {
    const [listIngredients, setListIngredients] = useState([]);
    const [suggestions,setSuggestions] = useState([]);
    const [onFocusInput, setOnFocusInput] = useState(null);

    let today = `${new Date().getFullYear()}-${new Date().getMonth()+1<10?"0"+String(new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate()}`;

    const [dateInput,setDateInput]=useState(today);

    const [warningOn,setIsWarningOn] = useState(false);

    const {profileInfo,setProfileInfo} = useContext(profileInfoContext);


    const navigate = useNavigate();


    function handleAddIngredientButton(){
        setIsWarningOn(false);
        let newIng = {name:"",numberAmount:"",measurement:"g"};
        setListIngredients([...listIngredients, newIng])
    }

    function handleChangeIngredientForm(event,index){
        setIsWarningOn(false);
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

              // console.log("Nutrients : ",response.data[0].foodNutrients);
  
              response.data[0].foodNutrients
                  .filter(nut => Object.keys(userFriendlyNutrientNames).includes(nut.name))
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
  

    function deleteIngredient(event,index){
      setIsWarningOn(false);
      event.preventDefault();

      let newList = [...listIngredients];
      newList.splice(index,1);
      setListIngredients(newList);
    }

    async function addWholeMealToDB(){
        //Create a new meal
      let mealID = await postMeal();
      mealID=mealID.data.data[0]["max(meal_id)"]
      
      if(mealID){
        //Add ingredients to the meal
      postIngredients(mealID);

      //Add nutrients to the meal
      postNutrients(mealID);

      navigate("/");
      }
      

    }

    async function postMeal(){

      const {profile_id} = profileInfo;
      // console.log(new Date(), dateInput, new Date(dateInput))
      const date = new Date(dateInput);
      // console.log("Post Meal");

      try{
        const mealID = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profile_id}`, {
          date
        });

        // console.log("Posted a meal worked!");
        return mealID;
      }
      catch(err){
        console.log(err);
      }
    }

    async function postIngredients(mealID){
      try {

        await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/ingredients/${mealID}`,{
          ingredientsList : listIngredients
        })

        // console.log("Posted ingredients worked!")

      } catch(err){
        console.log(err);
      }
    }

    async function postNutrients(mealID){
      let nutrientsListCalculated = await calculateNutrients(listIngredients);
      // console.log(nutrientsListCalculated)
  

      try{
        await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/nutrients/${mealID}`,{
          nutrientsList:nutrientsListCalculated
        })

        // console.log("Post nutrients worked!")
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

              
              if(response.data.foods) {
                let newSuggestions = response.data.foods.map(s=>s.description);
                setSuggestions(newSuggestions)
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
  

    

  return (
    <>

      <div id="AddAMeal">
      <h2>Log the meal for <input type='date' value={dateInput} onChange={(event)=>setDateInput(event.target.value)} /></h2>
        {listIngredients.map((ingredientObj,index)=>(
            <form key={index}>
                <input type='text' value={ingredientObj.name} name='name' placeholder='Name of ingredient' onChange={(event)=>handleChangeIngredientForm(event,index)} />

                
                
                <input type='number' value={ingredientObj.numberAmount} name='numberAmount' placeholder='Amount'  onChange={(event)=>handleChangeIngredientForm(event,index)} onFocus={()=>setOnFocusInput(null)}/>g

                <button className='roundButton' onClick={(event)=>deleteIngredient(event,index)}>x</button>

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

        {warningOn &&
          <p style={{color:"red"}}>Are you sure you added all the ingredients ?</p>
        }

        {!warningOn &&
          <div>
            <button onClick={()=>handleAddIngredientButton()} className='textButton'> Add an ingredient</button>
            <button className='importantTextButton' id='addMealButton' onClick={()=>setIsWarningOn(true)}>Add the meal</button>
          </div>
        }
        
        {warningOn &&
          <div>
            <button className='textButton' onClick={()=>setIsWarningOn(false)}>No</button>
            <button className='importantTextButton' onClick={()=>addWholeMealToDB()}>Yes</button>
          </div>
        }
        

        </div>
    </>

  )
}
