
import { useContext } from 'react';
import '../styles/BarGraph.css'
import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import unitNutrients from '../utilities/measurmentUnitNutrients';
import profileInfoContext from '../context/profileInfo';
import mealsForOneDate from '../context/mealsForOneDate';


export default function BarGraph() {

    const {currentDay} = useContext(mealsForOneDate)
    const {profileInfo} = useContext(profileInfoContext);

    const colors = ["#EA5F3A","#F79285","#FBC46C"];



    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients</h2>
        <div className = "BarGraph">
          
        {
        currentDay && currentDay.percentageNutrients && profileInfo.chosenNutrients &&
        currentDay.percentageNutrients.map((nut,index)=>(

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

          {profileInfo.chosenNutrients && currentDay.totalNutrients &&
            <p> {Math.round(currentDay.totalNutrients.find(n=>n.name===nut.name).amount*100)/100}/ {profileInfo.chosenNutrients.find(n=>n.name===nut.name).amount}{unitNutrients[nut.name]}</p>
          }
         
          </div>

        ))}

        </div>
      </>
    )
}
