
import { useContext, useEffect, useState } from 'react'
import "../styles/Profile2.css"

import loginAuth from '../context/loginAuth';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';

export default function Profile() {

    const {loginAuthValue,setLoginAuthValue,checkIfLoggedIn}=useContext(loginAuth);
    const navigate = useNavigate();

    const nutrientNamesArray = Object.values(userFriendlyNutrientNames);

    //Will come from profile
    const chosenNutrients = [{name:"Iron, Fe",goalAmount:18,type:"Aim for"},{name:"Vitamin C, total ascorbic acid",goalAmount:75,type:"At least"},{name:"Calcium, Ca",goalAmount:1000,type:"Less than"}]
    

    useEffect(()=>{
       checkIfLoggedIn();
    },[])



    const nutrients = ["Energy","Protein","Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Sugars, total including NLEA","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Omega-3 Fatty Acids (EPA, DHA)"];

    const [userObject, setUserObject] = useState({
        age:34,
        height:167,
        weight:70,
        chosenNutrients:["Cholesterol","Carbohydrate, by difference","Fiber, total dietary"],
        username:"Laura"
    })


    function logOut(){
        localStorage.removeItem("token");

        let newAuthValue = {...loginAuthValue};
        newAuthValue.isLoggedIn = false;

        setLoginAuthValue(newAuthValue);

        navigate("/login");
    }

    function isChecked(nutrient){
        // console.log(userObject.chosenNutrients);
        return userObject.chosenNutrients.includes(nutrient)? true : false;
    }



 //Level of activity

    return (
        <div id="profile">
            
                <div id='profileImage'>
                    
                    <img src="https://tinyurl.com/y8kt5xam" alt="Ruth Asawa sitting next to her art"/>
                    <button className='roundButton'><i class="fi fi-rr-refresh"></i></button>

                </div>
                
              
    
                <h1>Laura</h1>
                


                    
                <button className='logout textButton' onClick={()=>logOut()}>Log Out</button>
                <button className='importantTextButton' style={{marginLeft:"0"}} >Edit profile</button>

                <hr style={{margin:"50px 0"}} />   
                
                <h3>Nutrients to track</h3>

                <p style={{marginBottom:"30px",fontStyle:"italic"}}>We are not doctors, this is an average recommendation, check with your doctor to get precise intructions.</p>

                <div id='flexGoalNutrients'>
                    {chosenNutrients.map(nutrient=>(
                        <div className='nutrientDiv'>
                            <div>
                                <button className={nutrient.type==="Less than"? "selectedType roundButton" : "roundButton"}>&lt;</button>
                                <button className={nutrient.type==="Aim for"? "selectedType roundButton" : "roundButton"}>&#61;</button>
                                <button className={nutrient.type==="At least"? "selectedType roundButton" : "roundButton"}>&gt;</button>
                            </div>

                            <input value={nutrient.goalAmount} type='number'/>
                            
                            <select name='nutrientName' value={userFriendlyNutrientNames[nutrient.name]}>
                                {nutrientNamesArray.map((nut,index)=>(
                                    <option key={index} value={nut}>{nut}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                
                <button className='textButton'>Update changes</button>


            </div>
            
    )
}

