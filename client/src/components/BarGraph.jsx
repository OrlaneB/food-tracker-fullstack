/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import '../styles/BarGraph.css'
import mealsForOneDate from '../context/mealsForOneDate';
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';

export default function BarGraph({percentage}) {


    const colors = ["#EA5F3A","#F79285","#FBC46C"]

    const recommendations = {
      Protein:120,
      "Iron, Fe":180,
      "Vitamin A, RAE":2500
    }

    const {nutrientsByMeal} = useContext(mealsForOneDate);
    const [nutrients,setNutrients] = useState();

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
          let percentage = (100*listNutrients[nutName])/recommendations[nutName];

          nutrientsPercentage.push({nutrient_name:nutName,current:listNutrients[nutName],percentage})
        }

        setNutrients(nutrientsPercentage);

        
      }

    }

    useEffect(()=>{
      calculatePercentage();
    },[nutrientsByMeal]);


    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients for today</h2>
        <div className = "BarGraph">
        {nutrients && nutrients.map((nut,index)=>(
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
                    <span style={{color:"grey",fontSize:"0.7em"}}>/{recommendations[nut.nutrient_name]}g</span></p></div>
            <p className='nutrientName' >{userFriendlyNutrientNames[nut.nutrient_name]}</p>
          </div>
        ))}
        </div>
      </>
    )
}