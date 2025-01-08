import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import profileInfoContext from '../../context/profileInfo';

export default function LogOutButton() {

    const navigate = useNavigate();
    const {setProfileInfo} = useContext(profileInfoContext)

    function logOut(){

        localStorage.removeItem("token");
        setProfileInfo({
            id:null,
            username:"",
            chosenNutrients:null
        });

        navigate("/login");
    }

  return (
    <button
        className='logout textButton'
        onClick={()=>logOut()}
    >
        Log Out
    </button>
  )
}
