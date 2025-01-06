import React, { useContext, useEffect, useState } from 'react'
import profileInfoContext from '../../context/profileInfo'
import GoalButtons from './GoalButtons';
import Inputs from './Inputs';

export default function NutrientsForms() {

    const {chosenNutrients,id} = useContext(profileInfoContext).profileInfo;

    const [chosenNutrientsForm,setChosenNutrientsForm] = useState([
            {name:"",amount:0,goal:""},
            {name:"",amount:0,goal:""},
            {name:"",amount:0,goal:""}
        ])

    useEffect(()=>{
        if(chosenNutrients){
            setChosenNutrientsForm(JSON.parse(JSON.stringify(chosenNutrients)))
        }
    },[id])

  return (
    <>
        <h3>Nutrients to track</h3>

        <p
            style={{marginBottom:"30px",fontStyle:"italic"}}
        >
            Please, get your recommendations from experts.
        </p>

        <div id="flexGoalNutrients">
        {chosenNutrientsForm.map((nutrient,index)=>(
            <div className='nutrientDiv' key={index}>

                <GoalButtons nutrient={nutrient} chosenNutrientsForm={chosenNutrientsForm} setChosenNutrientsForm={setChosenNutrientsForm} index={index}/>

                <Inputs nutrient={nutrient} index={index} chosenNutrientsForm={chosenNutrientsForm} setChosenNutrientsForm={setChosenNutrientsForm} />

            </div>
        ))}
        </div>
    </>
  )
}
