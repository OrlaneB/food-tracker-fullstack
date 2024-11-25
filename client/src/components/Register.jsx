import React, {  useState } from 'react'
import axios from 'axios';

import "../styles/Register.css"
import { useNavigate } from 'react-router-dom';
import Login from './Login';


export default function Register() {

  const [credentials,setCredentials]=useState({
    username:"",
    password:""
  })

  const [errorMessage,setErrorMessage]=useState("");

  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    
    const { username, password } = credentials;
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/register`, {
        username,
        password,
      });

      if(response.status===201){
        console.log(response.data.message);
        navigate("/login");
      }
  
    } catch (err) {
      console.log(err.response.data.message)
      setErrorMessage(err.response.data.message)
      console.log(err.response.data);
      setCredentials({
        username:"",
        password:""
      })
    }

  }


  function handleChangeRegister(event){
    const {name,value} = event.target;

    let newRegisterObj = {...credentials};
    newRegisterObj[name]=value;

    setCredentials(newRegisterObj);
  }

  return (
    <>

        <div id='register'>
            <h1>Please sign up to start</h1>

            
              <form onSubmit={(event)=>register(event)}>


                <label>
                  Your username
                  <input type='text' value={credentials.username} name='username' autoComplete='username' onChange={(event)=>handleChangeRegister(event)}/>
                </label>

                <label>
                  Your password
                  <input type='password' value={credentials.password} name='password' autoComplete='password' onChange={(event)=>handleChangeRegister(event)} />
                </label>

                <p>{errorMessage}</p>

                <button type='submit' className='textButton'>Sign up</button>
                <p onClick={()=>navigate("/login")} className='buttonLink'>Already have an account ? Log in</p>
            </form>

        </div>
        

    </>
  )
}
