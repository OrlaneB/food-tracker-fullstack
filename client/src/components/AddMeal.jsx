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
    const [dateInput,setDateInput]=useState(new Date());

    const {checkIfLoggedIn}= useContext(loginAuth);
    const {warningOn,setIsWarningOn} = useState(false);

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



    function calculateNutrients (listIng){

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
                
                response.data[0].foodNutrients.filter(nut => nutrientList.includes(nut.name)).forEach(nut=>{
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

    function deleteIngredient(event,index){
      event.preventDefault();

      let newList = [...listIngredients];
      newList.splice(index,1);
      setListIngredients(newList);
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
      <h2>Log the meal for <input type='date' value={dateInput} onChange={(event)=>setDateInput(event.value)} /></h2>
        {listIngredients.map((ingredientObj,index)=>(
            // <AddAnIngredient ingredientObj={ingredientObj}  key={ingredientObj.id} />
            <form key={ingredientObj.id}>
                <input type='text' value={ingredientObj.name} name='name' placeholder='Name of ingredient' onChange={(event)=>handleChangeIngredientForm(event,index)} />

                
                
                <input type='number' value={ingredientObj.numberAmount} name='numberAmount' placeholder='Amount'  onChange={(event)=>handleChangeIngredientForm(event,index)} onFocus={()=>setOnFocusInput(null)}/>g

                <button className='roundButton' onClick={(event)=>deleteIngredient(event,index)}>x</button>

                {onFocusInput===index && suggestions &&
                  <div className='suggestionsContainer'>
                    {suggestions.map(s=>(
                    <p onClick={()=>handleClickSuggestion(index,s)}>{s}</p>
                    ))}
                  </div>
                }
            </form>
        ))}

        {!listIngredients[0] &&
          <p id='emptyIngList'>Add the ingredients of this meal.</p>
        }

        {warningOn &&
          <p>Are you sure you added all the ingredients ?</p>
        }
        
        <button onClick={()=>handleAddIngredientButton()} className='textButton'> Add an ingredient</button>

       
        <button className='importantTextButton'>Add the meal</button>
       
          

        </div>
    </>

  )
}