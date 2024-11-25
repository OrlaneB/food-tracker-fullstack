import React, { useContext, useState } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import profileInfoContext from '../context/profileInfo'

export default function Login() {
    const navigate = useNavigate();

    const {setProfileInfo} = useContext(profileInfoContext);

    const [credentials,setCredentials]=useState({username:"",password:""});
    const [errorMessage,setErrorMessage]=useState("");


    async function login(event){
      event.preventDefault();
      const {username,password} = credentials;
      setErrorMessage("");

      try{
        let response = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/login`,{
          username,password
          },{
           headers:{'Content-Type': 'application/json'}
	        });


        localStorage.setItem("token",response.data.token);
        setProfileInfo(response.data.profileInfo)


        navigate("/profile");

      } catch(err){
        console.log(err.response.data.message);
        console.log(err.response.data.err);

        if(err.response.status===401){
          setErrorMessage("Password is incorrect.");
        } else if(err.response.status===404){
          setErrorMessage("No user exists with that username.");
        }

        setCredentials({username:"",password:""})
      }
    }

    function handleChange(event){
      let {name,value}=event.target;

      let newCredentials = {...credentials};
      newCredentials[name]=value;

      setCredentials(newCredentials);
    }

  return (
    
        <div id='login'>
            <h1>Login to continue</h1>

            <form onSubmit={(event)=>login(event)}>

                    <label>
                      Your username
                      <input type='text' name='username' value={credentials.username} autoComplete='username' onChange={(event)=>handleChange(event)}/>
                    </label>

                    <label>
                      Your password
                      <input type='password' name='password' value={credentials.password} autoComplete='password' onChange={(event)=>handleChange(event)} />
                    </label>

                    
                    <p id='unauthorized'>{errorMessage}</p>

                    <button type='submit' className='textButton'>Login</button>
                    <p onClick={()=>navigate("/register")} className='buttonLink'>Don't have an account ? Sign up here</p>
            </form>
        </div>
  )
}
