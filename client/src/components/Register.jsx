import React, {  useState } from 'react'
import axios from 'axios';

import "../styles/Register.css"
import { useNavigate } from 'react-router-dom';


export default function Register() {

  async function register() {
    const { username, password } = registerObj;
  
    try {

  
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
      });
  
      console.log("It worked!");
    } catch (err) {
      console.log(err);
    }


    setStep(2);
  }

  const [registerObj,setRegisterObj]=useState({
    username:"",
    password:""
  })

  const navigate = useNavigate();

  function handleSubmitOne(event){
    event.preventDefault();

    register(registerObj);
    navigate("/profile");
  }


  function handleChangeRegister(event){
    const {name,value} = event.target;

    let newRegisterObj = {...registerObj};
    newRegisterObj[name]=value;

    setRegisterObj(newRegisterObj);
  }

  return (
    <>

        <div id='register'>
            <h1>Please sign up to start</h1>

            
              <form onSubmit={(event)=>handleSubmitOne(event)}>


                <label>
                  Your username
                  <input type='text' value={registerObj.username} name='username' autoComplete='username' onChange={(event)=>handleChangeRegister(event)}/>
                </label>

                <label>
                  Your password
                  <input type='password' value={registerObj.password} name='password' autoComplete='password' onChange={(event)=>handleChangeRegister(event)} />
                </label>

                <button type='submit' className='textButton'>Sign up</button>
                <p onClick={()=>navigate("/login")} className='buttonLink'>Already have an account ? Log in</p>
            </form>

        </div>
        

    </>
  )
}
