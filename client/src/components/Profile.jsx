
import { useContext, useEffect, useState } from 'react'
import "../styles/Profile.css"

import loginAuth from '../context/loginAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import unitNutrients from '../utilities/measurmentUnitNutrients';

import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import profileInfoContext from '../context/profileInfo';

export default function Profile() {

    const {loginAuthValue,setLoginAuthValue}=useContext(loginAuth);
    const {profileInfo,setProfileInfo}=useContext(profileInfoContext);
    const navigate = useNavigate();

    const [chosenNutrients,setChosenNutrients] = useState([{name:"",amount:"",goal:""}]);
    const [unsavedChanges,setUnsavedChanges] = useState(false);

    const nutrientNamesArray = Object.values(userFriendlyNutrientNames);


    function checkUnsavedChanges(){
        let {nutrient_1_name,nutrient_1_goal,nutrient_1_amount,nutrient_2_name,nutrient_2_goal,nutrient_2_amount,nutrient_3_name,nutrient_3_goal,nutrient_3_amount} = profileInfo;

        if(nutrient_1_name===chosenNutrients[0].name && nutrient_1_amount===chosenNutrients[0].amount &&                nutrient_1_goal===chosenNutrients[0].goal &&
            nutrient_2_name===chosenNutrients[1].name && nutrient_2_amount===chosenNutrients[1].amount && nutrient_2_goal===chosenNutrients[1].goal &&
            nutrient_3_name===chosenNutrients[2].name && nutrient_3_amount===chosenNutrients[2].amount && nutrient_3_goal===chosenNutrients[2].goal 
        ) return false

        return true
    }

    async function updateNutrientChanges(){
        let user_id = loginAuthValue.user_id;

        if(user_id){
            try{
                await axios.put(`${import.meta.env.VITE_URL_REQUESTS}/api/profiles/${user_id}`, {
                    nutrient_1_name:chosenNutrients[0].name,
                    nutrient_2_name:chosenNutrients[1].name,
                    nutrient_3_name:chosenNutrients[2].name,
                    nutrient_1_amount:chosenNutrients[0].amount,
                    nutrient_2_amount:chosenNutrients[1].amount,
                    nutrient_3_amount:chosenNutrients[2].amount,
                    nutrient_1_goal:chosenNutrients[0].goal,
                    nutrient_2_goal:chosenNutrients[1].goal,
                    nutrient_3_goal:chosenNutrients[2].goal
                });
        
            }
            catch(err){
                console.log(err)
            }
        }
        
    }


    useEffect(()=>{
        if(profileInfo) setChosenNutrients(profileInfo.chosenNutrients)
    },[profileInfo])

    useEffect(()=>{
        if(chosenNutrients[0].name) setUnsavedChanges(checkUnsavedChanges());
    },[chosenNutrients])


    function logOut(){
        localStorage.removeItem("token");

        let newAuthValue = {...loginAuthValue};
        newAuthValue.isLoggedIn = false;

        setLoginAuthValue(newAuthValue);
        setProfileInfo();

        navigate("/login");
    }

    function getScientificName(value){
        return Object.keys(userFriendlyNutrientNames).find(key => userFriendlyNutrientNames[key]===value);
    }


    function handleChangeInputs(event,index){
        let {name,value} = event.target;

        if(name==="amount") value=Number(value);
        if(name==="name") value=getScientificName(value)

        let newNutrients = [...chosenNutrients];
        newNutrients[index][name] = value;

        setChosenNutrients(newNutrients);
    }

    function handleChangeButtons(type,index){

        let newNutrients = [...chosenNutrients];
        newNutrients[index].goal = type;

        setChosenNutrients(newNutrients);
    }




    return (
        <div id="profile">
            
            { profileInfo && <div>
                <div id='profileImage'>
                    
                    <img src="/avatar-default.jpg" alt="User image default picture"/>
                    {/* <button className='roundButton'><i class="fi fi-rr-refresh"></i></button> */}

                </div>
                
                <h1>{profileInfo.username}</h1>
                
                <button className='logout textButton' onClick={()=>logOut()}>Log Out</button>
                <button className='importantTextButton' style={{marginLeft:"0"}} >Edit profile</button>

                <hr style={{margin:"50px 0"}} />   
                
                <h3>Nutrients to track</h3>

                <p style={{marginBottom:"30px",fontStyle:"italic"}}>Please, get your recommendations from experts.</p>

                <div id='flexGoalNutrients'>
                    {chosenNutrients.sort().map((nutrient,i)=>(
                        <div className='nutrientDiv' key={i}>
                            <div>
                                <button className={nutrient.goal==="Less than"? "selectedType roundButton" : "roundButton"} onClick={()=>handleChangeButtons("Less than",i)}>&lt;</button>
                                <button className={nutrient.goal==="Equals"? "selectedType roundButton" : "roundButton"} onClick={()=>handleChangeButtons("Equals",i)}>&#61;</button>
                                <button className={nutrient.goal==="More than"? "selectedType roundButton" : "roundButton"} onClick={()=>handleChangeButtons("More than",i)}>&gt;</button>
                            </div>

                            <input name='amount' value={nutrient.amount} type='number' onChange={(event)=>handleChangeInputs(event,i)}/> <p style={{display:"inline",fontSize:"0.8em"}}>{unitNutrients[nutrient.name]}</p>
                            
                            <select name='name' value={userFriendlyNutrientNames[nutrient.name]} onChange={(event)=>handleChangeInputs(event,i)}>
                                {nutrientNamesArray.map((nut,index)=>(
                                    <option key={index} value={nut}>{nut}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                
                {unsavedChanges && <button className='textButton' onClick={()=>updateNutrientChanges()} >Update changes</button>}
                </div>}


            </div>
            
    )
}

