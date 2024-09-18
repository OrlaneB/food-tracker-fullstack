/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import '../styles/BarGraph.css'
import mealsForOneDate from '../context/mealsForOneDate';
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import loginAuth from '../context/loginAuth';
import axios from 'axios';


export default function BarGraph({percentage}) {

    const {loginAuthValue,setLoginAuthValue}=useContext(loginAuth);

    const colors = ["#EA5F3A","#F79285","#FBC46C"]

    // const recommendations = {
    //   Protein:120,
    //   "Iron, Fe":180,
    //   "Vitamin A, RAE":2500
    // }

    const {nutrientsByMeal} = useContext(mealsForOneDate);
    const [nutrients,setNutrients] = useState();
    let goalAmounts = [];


    async function getProfileInfo(){
      let user_id = loginAuthValue.user_id;

      // console.log(user_id);

      if(user_id){
          try {

              const result = await axios.get(`http://localhost:5000/api/profiles/${user_id}`);

              let profileObj = result.data.resObj;
  
              // console.log("It worked!")
              
              goalAmounts = [{name:profileObj.nutrient_1_name, amount:profileObj.nutrient_1_amount},{name:profileObj.nutrient_2_name, amount:profileObj.nutrient_2_amount},{name:profileObj.nutrient_3_name, amount:profileObj.nutrient_3_amount}]
              
              calculatePercentage()

              
  
          }
          catch(err){
              console.log(err);
          }
      }
          
      
  }

    function calculatePercentage(){

        if(nutrientsByMeal){let allNutrients = [...nutrientsByMeal].flat();

        let listNutrients = {}

        allNutrients.forEach(nut=>{
          if(!Object.keys(listNutrients).includes(nut.nutrient_name)){
            listNutrients[nut.nutrient_name]=nut.nutrient_number_amount;
          }else {
            listNutrients[nut.nutrient_name]+=nut.nutrient_number_amount;
          }
        })

        let nutrientsPercentage = [];

        for(let nutName in listNutrients){
          let thisNutrientGoal = goalAmounts.filter(a=>a.name===nutName)[0]
          let percentage;
          
          if(thisNutrientGoal){
            percentage = (100*listNutrients[nutName])/thisNutrientGoal.amount;
            // console.log(percentage)
          }
          

          nutrientsPercentage.push({nutrient_name:nutName,current:listNutrients[nutName],percentage})
        }

        setNutrients(nutrientsPercentage);

        
      }

    }

    useEffect(()=>{
      getProfileInfo();
      calculatePercentage();
    },[nutrientsByMeal]);


    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients</h2>
        <div className = "BarGraph">
        {nutrients && nutrients.sort().map((nut,index)=>(
          <div className='pie' key={index} 
            style={
              nut.percentage < 50
              ? { backgroundImage: `conic-gradient(
                transparent 0deg ${360 - nut.percentage * 3.6}deg,
                ${colors[index]} ${360 - nut.percentage * 3.6}deg 360deg)`,}
              : {backgroundImage: `conic-gradient(
                transparent 0deg ${360 - nut.percentage * 3.6}deg,
                ${colors[index]} ${360 - nut.percentage * 3.6}deg 360deg)`,}
          }>
            <div className='text' >
                    <p>{nut.current}g <br/> 
                    <span style={{color:"grey",fontSize:"0.7em"}}>/{goalAmounts.filter(a=>a.name=nut.nutrient_name)}g</span></p></div>
            <p className='nutrientName' >{userFriendlyNutrientNames[nut.nutrient_name]}</p>
          </div>
        ))}
        </div>
      </>
    )
}