import React, { useContext, useState } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import loginAuth from '../context/loginAuth';

export default function Login() {
    const navigate = useNavigate();

    const [credentials,setCredentials]=useState({username:"",password:""});

    const {loginAuthValue, setLoginAuthValue} = useContext(loginAuth);


    async function login(event){
      event.preventDefault();
      const {username,password} = credentials;

      try{
        let result = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/login`,{
          username,password
        },{
           headers:{'Content-Type': 'application/json'}
	});

        localStorage.setItem("token",result.data.token);

        let newAuthValue = {...loginAuthValue};
        newAuthValue.isLoggedIn = true;
        newAuthValue.user_id = result.data.user_id;

        setLoginAuthValue(newAuthValue);

        navigate("/profile");

      } catch(err){
        console.log(err);
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

                    <button type='submit' className='textButton'>Sign up</button>
                    <p onClick={()=>navigate("/register")} className='buttonLink'>Don't have an account ? Sign up here</p>
            </form>
        </div>
  )
}
