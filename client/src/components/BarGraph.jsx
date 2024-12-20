
import { useContext, useEffect, useState } from 'react';
import '../styles/BarGraph.css'
import mealsForOneDate from '../context/mealsForOneDate';
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import unitNutrients from '../utilities/measurmentUnitNutrients';
import profileInfoContext from '../context/profileInfo';


export default function BarGraph({}) {

    const {profileInfo} = useContext(profileInfoContext);

    const colors = ["#EA5F3A","#F79285","#FBC46C"];

    const chosenNutrients = [];

    for(let key in profileInfo.chosenNutrients){
      const nutrient = profileInfo.chosenNutrients[key];

      chosenNutrients.push(nutrient.name);
    }


    const {nutrients} = useContext(mealsForOneDate);
    const [nutrientPercentage,setNutrientPercentage] = useState(null);


    function calculatePercentage(){

      if(!nutrients) return null;


      const percentageArray = [];
      const totalNutrients = {[chosenNutrients[0]]:0,[chosenNutrients[1]]:0,[chosenNutrients[2]]:0};

	//console.log(nutrients);
	//console.log("chosennutrients :",chosenNutrients);
	//console.log("init total nut : ", totalNutrients);
      Object.keys(nutrients).map((item,index)=>{
        const nutrient = nutrients[item];
        Object.keys(nutrient).filter(n=>chosenNutrients.includes(n)).map(n=>{
          totalNutrients[n]+=nutrient[n];
        })
      })

	//console.log("totalNutrient",totalNutrients);

      for(let key in profileInfo.chosenNutrients){
        const nutName = profileInfo.chosenNutrients[key].name;
        const nutGoal = profileInfo.chosenNutrients[key].amount;

        const percentage = Math.round((totalNutrients[nutName] * 100)/nutGoal);
        percentageArray.push({name:nutName,percentage,total:totalNutrients[nutName]})
      }


      setNutrientPercentage(percentageArray);
	//console.log(percentageArray);
    }


    useEffect(()=>{
      calculatePercentage();
    },[nutrients]);


    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients</h2>
        <div className = "BarGraph">
          
        {nutrients && profileInfo.chosenNutrients && nutrientPercentage && nutrientPercentage.sort((a,b)=>a.name.localeCompare(b.name)).map((nut,index)=>(

          <div key={index}>
          <div className='pie' style={{
            backgroundImage: `conic-gradient(
              transparent 0deg ${360 - nut.percentage * 3.6}deg,
              ${colors[index]} ${360 - nut.percentage * 3.6}deg 360deg
            )`
          }}>

            <div className='text'>
              <p>{userFriendlyNutrientNames[nut.name]}</p>
            </div>

          </div>

          {profileInfo.chosenNutrients &&
            <p> {Math.round(nut.total)} / {Object.values(profileInfo.chosenNutrients).filter(item=>item.name===nut.name)[0].amount}
            {unitNutrients[nut.name]}
            </p>
          }
         
          </div>

        ))}

        </div>
      </>
    )
}
