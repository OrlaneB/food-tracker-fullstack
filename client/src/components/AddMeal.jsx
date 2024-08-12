import React, { useState } from 'react';
const authKey = import.meta.env.VITE_APP_API_KEY;
import axios from 'axios'


export default function AddMeal() {
    const [listIngredients, setListIngredients] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [suggestions,setSuggestions] = useState([]);
    const [onFocusInput, setOnFocusInput] = useState(null);


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

    function postIngredients(ingList){
        // POST axios
        // data: {ingList}
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

    // calculateNutrients([{name:"tomato",numberAmount:150}]);


    function postMeals(todaysDate,profileid,nutrient1, nutrient2, nutrient3){
        // POST request with params to add meal to meals table
        // use today's date for now and refactor later in the case that a user wants to add meals for previous days 
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
  
    

  return (
    <div>
        {listIngredients.map((ingredientObj,index)=>(
            // <AddAnIngredient ingredientObj={ingredientObj}  key={ingredientObj.id} />
            <form key={ingredientObj.id}>
                <input type='text' value={ingredientObj.name} name='name' placeholder='Name of ingredient' onChange={(event)=>handleChangeIngredientForm(event,index)} />
                {onFocusInput===index && suggestions &&
                  <div>
                    {suggestions.map(s=>(
                    <div onClick={()=>handleClickSuggestion(index,s)}>{s}</div>
                    ))}
                  </div>
                }
                
                <input type='number' value={ingredientObj.numberAmount} name='numberAmount' placeholder='Amount'  onChange={(event)=>handleChangeIngredientForm(event,index)} onFocus={()=>setOnFocusInput(null)}/>g
            </form>
        ))}
        
        <button onClick={()=>calculateNutrients(listIngredients)}>Calculate nutrients</button>
        <button onClick={()=>handleAddIngredientButton()}>Add an ingredient</button>

        <button>Add the meal</button>
    </div>
  )
}