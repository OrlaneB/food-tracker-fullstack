import React from 'react'
import unitNutrients from '../../utilities/measurmentUnitNutrients';
import userFriendlyNutrientNames from '../../utilities/userFriendlyNutrientNames';

export default function Inputs({nutrient,index,chosenNutrientsForm, setChosenNutrientsForm}) {

    const nutrientNamesArray = Object.values(userFriendlyNutrientNames);


    function handleChangeInputs(event){
        let {name,value} = event.target;

        if(name==="amount") value = Number(value)
        if(name==="name") value = Object.keys(userFriendlyNutrientNames).find(key => userFriendlyNutrientNames[key]===value)

        const newNutrient = [...chosenNutrientsForm];
        newNutrient[index][name] = value;

        setChosenNutrientsForm(newNutrient)
    }

  return (
    <>
        <input 
            name='amount'
            value={nutrient.amount}
            type='number'
            onChange={(event)=>handleChangeInputs(event)}
        />

        <p>{unitNutrients[nutrient.name]}</p>

        <select
            name='name'
            value={userFriendlyNutrientNames[nutrient.name]}
            onChange={(event)=>handleChangeInputs(event)}
        >

            {nutrientNamesArray.map((n,nutrientIndex)=>(
                <option
                    key={nutrientIndex}
                    value={n}
                >
                    {n}
                </option>
            ))}

        </select>
    </>
  )
}
