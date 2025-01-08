import axios from "axios"

export default async function updateNutrientChanges(id,chosenNutrientsForm,profileInfo,setProfileInfo){

    const newChosenNutrients = {
        nutrient1 : chosenNutrientsForm[0],
        nutrient2 : chosenNutrientsForm[1],
        nutrient3 : chosenNutrientsForm[2]
    }

    if(id){

        try{
            const response = await axios.put(`${import.meta.env.VITE_URL_REQUESTS}/api/profiles/${id}`,{
                chosenNutrients:newChosenNutrients
            });

            if(response.status===201){
                console.log(response.data);
                let newProfileInfo = {...profileInfo};
                newProfileInfo.chosenNutrients = chosenNutrientsForm;
                setProfileInfo(newProfileInfo)
            }
        } catch(err){
            console.log(err.response.data.message)
            console.error(err.response.data.err)
        }

    }

}