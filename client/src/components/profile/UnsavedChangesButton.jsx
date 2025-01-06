import React, { useContext, useEffect, useState } from 'react'
import profileInfoContext from '../../context/profileInfo';
import updateNutrientChanges from '../../utilities/profile/updateNutrientChanges';

export default function UnsavedChangesButton({chosenNutrientsForm}) {

    const {setProfileInfo,profileInfo} = useContext(profileInfoContext);
    const {chosenNutrients,id} = profileInfo

    const [unsavedChanges,setUnsavedChanges] = useState(false);


    function compareObjects(obj1,obj2){
        if(obj1.name===obj2.name &&
            obj1.amount===obj2.amount &&
            obj1.goal===obj2.goal
        ) {
            return true
        } else {
            return false
        }
    }
    

    function checkUnsavedChanges(){

        const [nutrient1,nutrient2,nutrient3] = chosenNutrients;
        const [nutrient1State,nutrient2State,nutrient3State] = chosenNutrientsForm;

        if(
            compareObjects(nutrient1,nutrient1State) &&
            compareObjects(nutrient2,nutrient2State) &&
            compareObjects(nutrient3,nutrient3State)
        ) {
            return false
        } else {
            return true
        }
    }

    async function update(event){
        event.preventDefault();

        await updateNutrientChanges(id,chosenNutrientsForm,profileInfo,setProfileInfo);
        setUnsavedChanges(false);
    }

    useEffect(()=>{
        if(chosenNutrients) setUnsavedChanges(checkUnsavedChanges())
    },[chosenNutrientsForm])

  return (
    <>
        {unsavedChanges &&
            <button
                className='textButton'
                onClick={(event)=>update(event)}
            >
                Update changes
            </button>
        }
    </>
  )
}
