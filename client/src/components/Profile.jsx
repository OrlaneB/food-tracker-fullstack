
import { useContext, useEffect, useState } from 'react'
import "../styles/Profile2.css"

import loginAuth from '../context/loginAuth';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';

export default function Profile() {

    const {loginAuthValue,setLoginAuthValue,checkIfLoggedIn}=useContext(loginAuth);
    const navigate = useNavigate();


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
            
            <div id='header'>
                <div id='imageAndUsername'>
                    
                    <img src="https://tinyurl.com/y8kt5xam" alt="Ruth Asawa sitting next to her art"/>
                    <button className='textButton modifyImage'>Change image</button>

                </div>
                
                <div style={{width:"60%", maxWidth:"500px"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h1>Laura</h1>
                        <button className='logout textButton' onClick={()=>logOut()}>Log Out</button>
                    </div>
                        
                    <p>Medical Condition: Anemia</p>
                    
                    <div id='userInfo'>
                        <p>Age : {userObject.age}</p>
                        <p>Height : {userObject.height}</p>
                        <p>Weight : {userObject.weight}</p>
                    </div>

                    <button className='importantTextButton' style={{marginLeft:"0"}} >Modify profile</button>
                    
                        
                </div>
            </div>

            <div id='nutrientInfo'>
                <h2>Nutrients to track</h2>

                <p style={{marginBottom:"30px",fontStyle:"italic"}}>We are not doctors, this is an average recommendation, check with your doctor to get precise intructions.</p>

                <div id='flexGoalNutrients'>
                    {chosenNutrients.map(nutrient=>(
                        <div>
                            <p>{nutrient.type}</p>
                            <p>{nutrient.goalAmount}</p>
                            <p>{userFriendlyNutrientNames[nutrient.name]}</p>
                        </div>
                    ))}
                </div>

                
                <button className='textButton'>Update changes</button>

                </div>
                
                

                {/* <div id="nutrientGoals">
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
                </div> */}

            </div>
            
    )
}

