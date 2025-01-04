import React, { useState, useContext } from 'react';
const authKey = import.meta.env.VITE_APP_API_KEY;
import axios from 'axios'

import "../styles/AddAMeal.css"
import { useNavigate } from 'react-router-dom';
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import profileInfoContext from '../context/profileInfo';

import calculateNutrients from '../utilities/calculateNutrients';

export default function AddMeal() {

    const [listIngredients, setListIngredients] = useState([]);
    const [suggestions,setSuggestions] = useState([]);
    const [onFocusInput, setOnFocusInput] = useState(null);

    let today = `${new Date().getFullYear()}-${new Date().getMonth()+1<10?"0"+String(new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate().length===2?new Date().getDate():"0"+new Date().getDate()}`;

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


  //   async function calculateNutrients(listIng) {
  
  //     // Create an array of axios GET requests
  //     const requests = listIng.map(ingredient =>
  //         axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {
  //             params: {
  //                 query: ingredient.name,
  //                 dataType: "Survey (FNDDS)",
  //                 pageSize: 1, // Limit the number of results per page if necessary
  //             },
  //         })
  //     );
  
  //     try {
  //         // Wait for all requests to complete
  //         const responses = await axios.all(requests);

  //         const allNutrients = {};
          
  //         //Create object with 20 nutrient names
  //         Object.keys(userFriendlyNutrientNames).map(nut=>{
  //           allNutrients[nut]=0;
  //         })

  //         //For each ingredient, add nutrients to object
  //         responses.forEach((res)=>{
  //           const ing = res.data[0].description;
  //           const ingAmount = listIngredients.filter(i=>i.name===ing)[0].numberAmount;

  //           res.data[0].foodNutrients
  //           .filter(nut=>Object.keys(userFriendlyNutrientNames).includes(nut.name))
  //           .forEach(nut=>{
  //             allNutrients[nut.name]+=((nut.amount/100)*ingAmount);
  //           })
  //         })

  //         //Round nutrients to 2nd decimal
  //         for(let key in allNutrients){
  //           allNutrients[key] = Math.round(allNutrients[key]*100)/100;
  //         }

  //         return allNutrients
  
  //     } catch (errors) {
  //         console.log(errors); // Handle errors
  //         return "Did not work";
  //     }
  // }
  

    function deleteIngredient(event,index){
      setIsWarningOn(false);
      event.preventDefault();

      let newList = [...listIngredients];
      newList.splice(index,1);
      setListIngredients(newList);
    }

    async function addWholeMealToDB(){

        let nutrients;

        await calculateNutrients(listIngredients)
        .then(result=> {
          nutrients=result;
        }).catch(err=>{
          console.log(err)
        })

        let ingredients={}

        listIngredients.forEach(i=>{
          ingredients[i.name]=Number(i.numberAmount);
        })

        const date = new Date(dateInput).toLocaleDateString('en-CA')


        await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/meals/${profileInfo.id}`,{
          date,nutrients,ingredients
        }).then(response=>{
          console.log(response.data.message)
          navigate("/");
        }).catch(err=>{
          console.log(err)
        })

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
