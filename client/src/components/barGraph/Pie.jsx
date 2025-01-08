import React from 'react'
import userFriendlyNutrientNames from '../../utilities/userFriendlyNutrientNames';


export default function Pie({nut,index}) {

    const colors = ["#EA5F3A","#F79285","#FBC46C"];


  return (
    <div className='pie'
        style={{backgroundImage:`conic-gradient(
              transparent 0deg ${360 - nut.percentage * 3.6}deg,
              ${colors[index]} ${360 - nut.percentage * 3.6}deg 360deg
            )`}}>


            <div className='text'>
                <p>{userFriendlyNutrientNames[nut.name]}</p>
            </div>
    </div>
  )
}
