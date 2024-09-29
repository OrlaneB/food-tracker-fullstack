/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Day from './Day'
import BarGraph from './BarGraph'
import MealCards from './MealCards'
import NavBar from "./NavBar"
import '../styles/Homepage.css'
import '../styles/NavBar.css'
import loginAuth from '../context/loginAuth'
import axios from 'axios'

import mealsForOneDate from '../context/mealsForOneDate'
import { useNavigate } from 'react-router-dom'



export default function Homepage() {

  const {loginAuthValue,setLoginAuthValue}=useContext(loginAuth);
  const [day,setDay]=useState(new Date())

  // useEffect(()=>{
  //   checkIfLoggedIn();
  // },[])
  const navigate = useNavigate();

  //"2024-08-01"
  const [meals,setMeals]=useState();
  const [nutrientsByMeal,setNutrientsByMeal]=useState();
  const [noMealsForThisDate,setNoMealsForThisDate]=useState(false);
  const [chosenNutrients,setChosenNutrients]=useState([{name:null,amount:null,goal:null}]);

  //Will come from AuthContext
  // const chosenNutrients=["Protein","Vitamin A, RAE","Iron, Fe"]

  let dummyData = [
    {name:"", percentage:50},
    {name:"", percentage:50},
    {name:"",percentage:50}];

  const [nutrientPercentage,setNutrientPercentage] = useState(dummyData);

  async function getProfileInfo(){
    let user_id = loginAuthValue.user_id;

    console.log(user_id);

    if(user_id){
        try {

            const result = await axios.get(`http://localhost:5000/api/profiles/${user_id}`);

            let profileObj = result.data.resObj;

            console.log("It worked!")

            setChosenNutrients(
                [{name: profileObj.nutrient_1_name, amount:profileObj.nutrient_1_amount, goal:profileObj.nutrient_1_goal},
                {name: profileObj.nutrient_2_name, amount:profileObj.nutrient_2_amount, goal:profileObj.nutrient_2_goal},
                {name: profileObj.nutrient_3_name, amount:profileObj.nutrient_3_amount, goal:profileObj.nutrient_3_goal}]
            )

        }
        catch(err){
            console.log(err);
        }
    }
        
    
}


      
  async function getMeals() {
    if(!chosenNutrients[0].name) return;
    try {
      const result = await axios.get("http://localhost:5000/api/meals/1", {
        params: { date: `${day.getFullYear()}-${day.getMonth()+1<10? `0${day.getMonth()+1}`:day.getMonth()+1}-${day.getDate()<10? `0${day.getDate()}`:day.getDate()}` }
      });
      
      if(result.data.dataIngredients[0]){

        setNoMealsForThisDate(false)

      const {dataIngredients,dataNutrients} = result.data;
      console.log(dataNutrients)


      let mealsID = new Set(dataIngredients.map(meal=>meal.meal_id));
      mealsID = Array.from(mealsID);

      // Create Meals
      

      let newMeals=[];

        for(let i =0; i<mealsID.length ; i++){
          let num = mealsID[i];

          let meal = {}
          dataIngredients.filter(m=>m.meal_id===num).map(ing=>{
            meal[ing.name]=ing.number_amount;
          })
          newMeals.push(meal);
        }

        setMeals(newMeals);

      
      //Create nutrients

      let newNutrientsByMeal = [];

      for (let index in mealsID) {
          let num = mealsID[index];
          console.log("num : ",num)

          console.log("chosen nutrients : ",chosenNutrients)

          if(chosenNutrients[0].name){
            let arrayChosenNutrient = chosenNutrients.map(nut=>nut.name);
            console.log("arrayChosenNutrients : ",arrayChosenNutrient)
            let meal = dataNutrients.filter(n=>n.meal_id===num && arrayChosenNutrient.includes(n.nutrient_name))
            console.log("dataNutrients : ",dataNutrients)
            // console.log(meal);
            
            meal = meal.map(n=>{return {"nutrient_name":n.nutrient_name,"nutrient_number_amount":n.nutrient_number_amount} })

            // console.log(meal)

            newNutrientsByMeal.push(meal)
          }
          
        
        }

        setNutrientsByMeal(newNutrientsByMeal);
        // console.log(newNutrientsByMeal);
      
      } else {
        setNoMealsForThisDate(true)
      }
      
      

    } catch (err) {
      console.log(err);
    }
  }



  useEffect(()=>{
    getMeals()
  },[day])

  useEffect(()=>{
    setTimeout(()=>{getProfileInfo()},100);
  },[loginAuthValue])

  useEffect(()=>{
    getMeals()
  },[chosenNutrients])
      

  return (
    <div className='Homepage'>

      
    <mealsForOneDate.Provider value={{meals,nutrientsByMeal}}>
      <Day dateObj={{day,setDay}}/>
      <hr style={{width:"80%",borderWidth:"0.5px", marginTop:"0",marginBottom:"15px"}}/>
      {!noMealsForThisDate &&
          <>
            <BarGraph percentage={nutrientPercentage}/>
            <MealCards />
          </>
      }
      
    </mealsForOneDate.Provider>

    {noMealsForThisDate &&
      <div id='noMealWarning'>
        <p>There are no meals for this date.</p>
        <button onClick={()=>navigate("/add-meal")} className='textButton'>Add one here</button>
      </div>
    }
      {/* <NavBar/> */}
    

    </div>
  )
}
