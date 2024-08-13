/* eslint-disable no-unused-vars */

/* Profile
This screen should have the following:
- Username
- Avatar/ image
- Medical condition
- Data preferences: nutrient list, medical condition - has state
- Age, gender, weight, height - has state
- Link your device
*/
import { useState } from 'react'
// import '../styles/Profile.css'
import "../styles/Profile2.css"

export default function Profile() {


    const nutrients = ["Energy","Protein","Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Sugars, total including NLEA","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Omega-3 Fatty Acids (EPA, DHA)"];

    const [userObject, setUserObject] = useState({
        age:34,
        height:167,
        weight:70,
        chosenNutrients:["Cholesterol","Carbohydrate, by difference","Fiber, total dietary"],
        username:"Laura"
    })


    function isChecked(nutrient){
        // console.log(userObject.chosenNutrients);
        return userObject.chosenNutrients.includes(nutrient)? true : false;
    }



 //Level of activity

    return (
        <div id="profile">
            <div id='header'>
                <div id='imageAndUsername'>
                    
                    <img src="https://tinyurl.com/y8kt5xam" alt="Ruth Asawa sitting next to her art" id="profilePicture"/>
                    <button>Change image</button>
                </div>
                
                <div id="details">
                        <h1>@Laura</h1>
                        <h2>Medical Condition: Anemia</h2>
                        <p>{userObject.age}</p>
                        <p>{userObject.height}</p>
                        <p>{userObject.weight}</p>
                </div>
            </div>

                <div id="nutrientGoals">
                    <h2>Your daily goals</h2>
                    <p id="warning">We are not doctors, this is an average recommendation, check with your doctor to get precise intructions.</p>
                    <form>
                        <label> {userObject.chosenNutrients[0]}
                            <input type='text' />
                        </label>
                        <label> {userObject.chosenNutrients[1]}
                            <input type='text' />
                        </label>
                        <label> {userObject.chosenNutrients[2]}
                            <input type='text' />
                        </label>
                    </form>
                </div>


                <h2 style={{textAlign:"center"}}>Nutrients to track</h2>
                <div id="nutrientGrid">

                        {nutrients.map((nutrient) => (
                            <div key={nutrient}>
                                <input type='checkbox' checked={isChecked(nutrient)? "checked" : ""} />
                                <label>{nutrient}</label>
                            </div>
                        ))}
                </div>
            
        </div>
    )
}

