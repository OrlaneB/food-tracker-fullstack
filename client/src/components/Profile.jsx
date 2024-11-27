
import { useContext, useEffect, useState } from 'react'
import "../styles/Profile.css"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import unitNutrients from '../utilities/measurmentUnitNutrients';

import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import profileInfoContext from '../context/profileInfo';

export default function Profile() {

    const {profileInfo,setProfileInfo}=useContext(profileInfoContext);
    const navigate = useNavigate();

    const [chosenNutrients,setChosenNutrients] = useState({
        nutrient1:{name:"",amount:0,goal:""},
        nutrient2:{name:"",amount:0,goal:""},
        nutrient3:{name:"",amount:0,goal:""}
    })
    const [unsavedChanges,setUnsavedChanges] = useState(false);

    const nutrientNamesArray = Object.values(userFriendlyNutrientNames);


    function checkUnsavedChanges(){
 
        const {nutrient1,nutrient2,nutrient3} = profileInfo.chosenNutrients
        const nutrient1State = chosenNutrients.nutrient1;
        const nutrient2State = chosenNutrients.nutrient2;
        const nutrient3State = chosenNutrients.nutrient3;


        if(
            nutrient1State.name === nutrient1.name && nutrient1State.amount === nutrient1.amount && nutrient1State.goal === nutrient1.goal &&
            nutrient2State.name === nutrient2.name && nutrient2State.amount === nutrient2.amount && nutrient2State.goal === nutrient2.goal &&
            nutrient3State.name === nutrient3.name && nutrient3State.amount === nutrient3.amount && nutrient3State.goal === nutrient3.goal
        ) {
            return false
            
        } else {
            return true
        }

    }


    function getButtonClass(type,goal){
        if(type===goal){
            return "selectedType roundButton"
        } else {
            return "roundButton"
        }
    }

    async function updateNutrientChanges(){
        let user_id = profileInfo.id;

        if(user_id){
            try{
                const response = await axios.put(`${import.meta.env.VITE_URL_REQUESTS}/api/profiles/${user_id}`, {
                    chosenNutrients
                });

                if(response.status===201){
                    console.log(response.data);
			let newProfileInfo = {...profileInfo};
			newProfileInfo.chosenNutrients=chosenNutrients;
			setProfileInfo(newProfileInfo);
                    setUnsavedChanges(false);
                }
        
            }
            catch(err){
                console.log(err.response.data.message)
                console.error(err.response.data.err)
            }
        }
        
    }



    function logOut(){
        localStorage.removeItem("token");
        setProfileInfo({
            id:null,
            username:"",
            chosenNutrients:null
          });

        navigate("/login");
    }

    function getScientificName(value){
        return Object.keys(userFriendlyNutrientNames).find(key => userFriendlyNutrientNames[key]===value);
    }


    function handleChangeInputs(event,index){
        let {name,value} = event.target;

        if(name==="amount") value=Number(value);
        if(name==="name") value=getScientificName(value)
        
        const nutrient = `nutrient${index+1}`

        const newNutrient = {...chosenNutrients};
        newNutrient[nutrient][name] = value;

        setChosenNutrients(newNutrient);
    }

    function handleChangeButtons(type,index){

        let newNutrients = {...chosenNutrients}
        const nutrient = `nutrient${index+1}`

        newNutrients[nutrient].goal = type;

        setChosenNutrients(newNutrients)
    }

    useEffect(()=>{
        if(profileInfo.chosenNutrients) setChosenNutrients(JSON.parse(JSON.stringify(profileInfo.chosenNutrients)))
    },[profileInfo.id])

    useEffect(()=>{
        if(profileInfo.chosenNutrients) setUnsavedChanges(checkUnsavedChanges());
    },[chosenNutrients])




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


                {profileInfo.chosenNutrients && typeof profileInfo.chosenNutrients === 'object' &&
                
                    <div id='flexGoalNutrients'>

                    {Object.entries(chosenNutrients || {}).map(([key,nutrient],i)=>(
                        <div className='nutrientDiv' key={i}>
                            <div>
                                <button className={getButtonClass("Less than",nutrient.goal)}
                                        onClick={()=>handleChangeButtons("Less than",i)}
                                >&lt;</button>
                                <button className={getButtonClass("Equals",nutrient.goal)}
                                        onClick={()=>handleChangeButtons("Equals",i)}
                                >&#61;</button>
                                <button className={getButtonClass("More than",nutrient.goal)}
                                        onClick={()=>handleChangeButtons("More than",i)}
                                >&gt;</button>
                            </div>

                            <input
                                name='amount'
                                value={nutrient.amount}
                                type='number'
                                onChange={(event)=>handleChangeInputs(event,i)}
                            />
                            <p>{unitNutrients[nutrient.name]}</p>

                            <select
                                name='name'
                                value={userFriendlyNutrientNames[nutrient.name]}  
                                onChange={(event)=>handleChangeInputs(event,i)} >

                                {nutrientNamesArray.map((nut,index)=>(
                                    <option key={index} value={nut}>{nut}</option>
                                ))}

                            </select>
                        </div>
                    ))}
                    
                </div>}

                
                {unsavedChanges && <button className='textButton' onClick={()=>updateNutrientChanges()} >Update changes</button>}
                </div>}


            </div>
            
    )
}

