
import { useContext, useEffect, useState } from 'react'
import "../styles/Profile.css"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import unitNutrients from '../utilities/measurmentUnitNutrients';

import userFriendlyNutrientNames from '../utilities/userFriendlyNutrientNames';
import profileInfoContext from '../context/profileInfo';
import LogOutButton from './profile/LogOutButton';
import EditProfileButton from './profile/EditProfileButton';
import NutrientsForms from './profile/NutrientsForms';

export default function Profile() {

    const {profileInfo,setProfileInfo}=useContext(profileInfoContext);
    const navigate = useNavigate();

    const [chosenNutrients,setChosenNutrients] = useState([
        {name:"",amount:0,goal:""},
        {name:"",amount:0,goal:""},
        {name:"",amount:0,goal:""}
    ])

    const [unsavedChanges,setUnsavedChanges] = useState(false);
    // const goalButtons = [
    //     {name:"Less than",sign:"<"},
    //     {name:"Equals",sign:"="},
    //     {name:"More than",sign:">"}
    // ];

    const nutrientNamesArray = Object.values(userFriendlyNutrientNames);

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
 
        const [nutrient1,nutrient2,nutrient3] = profileInfo.chosenNutrients
        const [nutrient1State,nutrient2State,nutrient3State] = chosenNutrients


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


    // function getButtonClass(type,goal){
    //     if(type===goal){
    //         return "selectedType roundButton"
    //     } else {
    //         return "roundButton"
    //     }
    // }

    async function updateNutrientChanges(){
        let user_id = profileInfo.id;

        const newChosenNutrients = {
            nutrient1 : chosenNutrients[0],
            nutrient2 : chosenNutrients[1],
            nutrient3 : chosenNutrients[2]
        }

        if(user_id){
            try{
                const response = await axios.put(`${import.meta.env.VITE_URL_REQUESTS}/api/profiles/${user_id}`, {
                    chosenNutrients:newChosenNutrients
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



    // function logOut(){
    //     localStorage.removeItem("token");
    //     setProfileInfo({
    //         id:null,
    //         username:"",
    //         chosenNutrients:null
    //       });

    //     navigate("/login");
    // }

    function getScientificName(value){
        return Object.keys(userFriendlyNutrientNames).find(key => userFriendlyNutrientNames[key]===value);
    }


    function handleChangeInputs(event,index){
        let {name,value} = event.target;

        if(name==="amount") value=Number(value);
        if(name==="name") value=getScientificName(value)
        

        const newNutrient = [...chosenNutrients];
        newNutrient[index][name] = value;

        setChosenNutrients(newNutrient);
    }

    function handleChangeButtons(type,index){

        let newNutrients = [...chosenNutrients]
        newNutrients[index].goal = type;

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

                <LogOutButton />
                <EditProfileButton />
                
                {/* <button className='logout textButton' onClick={()=>logOut()}>Log Out</button> */}
                {/* <button className='importantTextButton' style={{marginLeft:"0"}} >Edit profile</button> */}

                <hr style={{margin:"50px 0"}} />   

                <NutrientsForms />
                
                {/* <h3>Nutrients to track</h3>

                <p style={{marginBottom:"30px",fontStyle:"italic"}}>Please, get your recommendations from experts.</p>


                {profileInfo.chosenNutrients && typeof profileInfo.chosenNutrients === 'object' &&
                
                    <div id='flexGoalNutrients'>

                    {chosenNutrients.map((nutrient,i)=>(
                        <div className='nutrientDiv' key={i}>
                            <div>
                                {goalButtons.map((g,j)=>(
                                    <button className={getButtonClass(g.name,nutrient.goal)}
                                        onClick={()=>handleChangeButtons(g.name,i)}
                                        key={j}>
                                        {g.sign}
                                    </button>
                                ))}
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

                    
                    
                </div>} */}

                
                {unsavedChanges && <button className='textButton' onClick={()=>updateNutrientChanges()} >Update changes</button>}
                </div>}


            </div>
            
    )
}

