import React, { useContext } from 'react'
import login from '../../utilities/authentification/login'
import register from '../../utilities/authentification/register';
import profileInfoContext from '../../context/profileInfo'
import { useNavigate } from 'react-router-dom';

export default function SubmitButton({type,credentials,setErrorMessage,setCredentials}) {

    const navigate = useNavigate();

    const {setProfileInfo} = useContext(profileInfoContext);

    const defaultCredentials = {
        username:"",
        password:""
    }


    async function getLogged(event){

        event.preventDefault();

        const response = await login(credentials)

        if(response.authentification){
            setProfileInfo(response.profileInfo);
            navigate("/profile");
        } else {

            if(response.status===401){
                setErrorMessage("Password is incorrect.");
              } else if(response.status===404){
                setErrorMessage("No user exists with that username.");
              }

            setCredentials(defaultCredentials)
        }
    }

    async function getRegistered(event){

        event.preventDefault();

        const response = await register(credentials);

        if(response.authentification){
            navigate("/login");
        } else {
            setErrorMessage(response.errorMessage)
            setCredentials(defaultCredentials)
        }
    }

    function throwError(event){
        event.preventDefault();

        throw new Error("Type is incorrect");
    }

  return (
    <button
        type='submit'
        className='textButton'
        onClick={(event)=>
            type==="login"?getLogged(event):
            type==="register" ?getRegistered(event) : 
            throwError(event)
        }
    >
        {type==="login" ? "Login" : 
        type==="register" ? "Sign up" : 
        ""}
    </button>
  )
}
