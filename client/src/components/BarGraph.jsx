/* eslint-disable react/prop-types */
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
    // const [totalNutrients,setTotalNutrients] = useState({})
 
    


    function calculatePercentage(){

      if(!nutrients) return

      console.log("nutrients",nutrients);

      const percentageArray = [];
      const totalNutrients = {[chosenNutrients[0]]:0,[chosenNutrients[1]]:0,[chosenNutrients[2]]:0};

      console.log("totalNutrients",totalNutrients);


      Object.keys(nutrients).map((item,index)=>{
        const nutrient = nutrients[item][index+1];
        Object.keys(nutrient).filter(n=>chosenNutrients.includes(n)).map(n=>{
          totalNutrients[n]+=nutrient[n];
        })
      })


      for(let key in profileInfo.chosenNutrients){
        const nutName = profileInfo.chosenNutrients[key].name;
        const nutGoal = profileInfo.chosenNutrients[key].amount;

        const percentage = Math.round((totalNutrients[nutName] * 100)/nutGoal);
        percentageArray.push({name:nutName,percentage,total:totalNutrients[nutName]})
      }

      console.log("percentageArray",percentageArray)

      setNutrientPercentage(percentageArray);
    }


    useEffect(()=>{
      calculatePercentage();
    },[nutrients]);


    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients</h2>
        <div className = "BarGraph">
          
        {nutrients && profileInfo.chosenNutrients && nutrientPercentage && nutrientPercentage.map((nut,index)=>(

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
            <p> {nut.total} / {Object.values(profileInfo.chosenNutrients).filter(item=>item.name===nut.name)[0].amount}
            {unitNutrients[nut.name]}
            </p>
          }
         
          </div>

        ))}



            {/* {nutrients && nutrients.sort().map((nut,index)=>(
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
                    <p>{nut.current.toFixed(2)} {unitNutrients[nut.nutrient_name]}</p>
                  </div>

                  <p className='nutrientName' >{userFriendlyNutrientNames[nut.nutrient_name]}</p>
                </div>
            ))} */}
        </div>
      </>
    )
}