import React, { useContext, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios';

import "../styles/Register.css"
import { useNavigate } from 'react-router-dom';

// import loginAuth from '../context/loginAuth';

export default function Register() {

  async function register() {
    const { username, email, password } = registerObj;
    // console.log(username, email, password);
  
    try {
      console.log("a");
  
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      });
  
      console.log("It worked!");
    } catch (err) {
      console.log(err);
    }


    setStep(2);
  }

  // const register = useContext(loginAuth).register;

  const [step,setStep]=useState(1);
  const [registerObj,setRegisterObj]=useState({
    username:"",
    email:"",
    password:""
  })

  const navigate = useNavigate();

  function handleSubmitOne(event){
    event.preventDefault();

    register(registerObj);
  }

  function handleGoBack(event){
    event.preventDefault();
    setStep(1);
  }

  function handleSubmitTwo(event){
    event.preventDefault();

    //Put into database

    navigate("/profile");
  }


  function handleChangeRegister(event){
    const {name,value} = event.target;

    let newRegisterObj = {...registerObj};
    newRegisterObj[name]=value;

    setRegisterObj(newRegisterObj);
  }

  return (
    <div>

        <div id='register'>
            <h1>Please sign up to start</h1>

            { step===1 &&
              <form onSubmit={(event)=>handleSubmitOne(event)}>
                <label>
                  Your email
                  <input type='email' value={registerObj.email} name='email' autoComplete='email' onChange={(event)=>handleChangeRegister(event)}/>
                </label>

                <label>
                  Your username
                  <input type='text' value={registerObj.username} name='username' autoComplete='username' onChange={(event)=>handleChangeRegister(event)}/>
                </label>

                <label>
                  Your password
                  <input type='password' value={registerObj.password} name='password' autoComplete='password' onChange={(event)=>handleChangeRegister(event)} />
                </label>

                <button type='submit'>Sign up</button>
                <p onClick={()=>navigate("/login")} >Already have an account ? Log in</p>
            </form>}

            { step===2 &&
              <form onSubmit={(event)=>handleSubmitTwo(event)}>

                <p>Let us know some more info about you</p>
                <label>
                  Your age
                  <input type='number' />
                </label>

                Your gender
                <label id='genderLabel'>
                  <label>  <input type='radio' name='gender'/>Female</label>
                  <label><input type='radio' name='gender'/>Male</label>
                  <label>  <input type='radio' name='gender'/>Non-Binary</label>
                  <label>  <input type='radio' name='gender'/>Other/I'd rather not say</label>
                </label>

                <label>
                  Your weight
                  <input type='number' />
                </label>

                <label>
                  Your height
                  <input type='number' />
                </label>

                <label>
                  Your medical condition
                  <input type='text' list='medical-condition'/>
                    <datalist id="medical-condition">
                      <option value="Diabetes" />
                      <option value="Hypertension" />
                      <option value="Osteoporosis" />
                      <option value="Chronic Kidney Disease (CKD)" />
                      <option value="Celiac Disease" />
                      <option value="Hypercholesterolemia (High Cholesterol)" />
                      <option value="Anemia" />
                      <option value="Irritable Bowel Syndrome (IBS)" />
                      <option value="Other/I'd rather not say" />
                    </datalist>
                </label>

                <button onClick={(event)=>handleGoBack(event)}>Go back</button>
                <button type='submit'>Continue with my profile</button>

                <p onClick={()=>navigate("/login")}>Pass this step</p>

              </form>

            }
        </div>
        

        <NavBar />
    </div>
  )
}
