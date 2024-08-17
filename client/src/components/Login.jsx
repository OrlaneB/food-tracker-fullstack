import React, { useContext, useState } from 'react'
import "../styles/Login.css"
import NavBar from './NavBar'
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
        let result = await axios.post("http://localhost:5000/api/users/login",{
          username,password
        })

        let token = result.data.token;

        localStorage.setItem("token",token);

        console.log("it worked!");

        let newAuthValue = {...loginAuthValue};
        newAuthValue.isLoggedIn = true;

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
    <>
        <div id='login'>
            <h1>Login to continue</h1>
            <form onSubmit={(event)=>login(event)}>

                    <label>
                    Your username
                    <input type='text' name='username' value={credentials.username} onChange={(event)=>handleChange(event)}/>
                    </label>

                    <label>
                    Your password
                    <input type='password' name='password' value={credentials.password} onChange={(event)=>handleChange(event)} />
                    </label>

                    <button type='submit'>Sign up</button>
                    <p onClick={()=>navigate("/register")}>Don't have an account ? Sign up here</p>
            </form>
        </div>
        
        <NavBar />
    </>
  )
}
