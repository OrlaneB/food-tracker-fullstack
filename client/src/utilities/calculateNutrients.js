const authKey = import.meta.env.VITE_APP_API_KEY;
import userFriendlyNutrientNames from "./userFriendlyNutrientNames"
import axios from "axios";


export default async function calculateNutrients(listIng) {

  
    // Create an array of axios GET requests
    const requests = listIng.map(ingredient =>
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${authKey}`, {
            params: {
                query: ingredient.name,
                dataType: "Survey (FNDDS)",
                pageSize: 1,
            },
        })
    );



    try {
        // Wait for all requests to complete
        const responses = await axios.all(requests);

        const allNutrients = {};

        
        //Create object with 20 nutrient names
        Object.keys(userFriendlyNutrientNames).map(nut=>{
          allNutrients[nut]=0;
        })

        //For each ingredient, add nutrients to object
        responses.forEach((res,index)=>{

          let ingAmount;
          
          
          if("numberAmount" in listIng[index]) {
            ingAmount = listIng[index].numberAmount;
          } else if("amount" in listIng[index]){
            ingAmount = listIng[index].amount;
          }


          res.data[0].foodNutrients
          .filter(nut=>Object.keys(userFriendlyNutrientNames).includes(nut.name))
          .forEach(nut=>{
            allNutrients[nut.name]+=((nut.amount/100)*ingAmount);
          })
        })


        //Round nutrients to 2nd decimal
        for(let key in allNutrients){
          allNutrients[key] = Math.round(allNutrients[key]*100)/100;
        }


        return allNutrients

    } catch (errors) {
        console.log(errors); // Handle errors
        return new Error({message:"Error"});
    }
}