import React from 'react'
import "../styles/Login.css"
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();

  return (
    <>
        <div id='login'>
            <h1>Login to continue</h1>
            <form onSubmit={(event)=>handleSubmitOne(event)}>

                    <label>
                    Your username
                    <input type='text' />
                    </label>

                    <label>
                    Your password
                    <input type='password' />
                    </label>

                    <button type='submit'>Sign up</button>
                    <p onClick={()=>navigate("/register")}>Don't have an account ? Sign up here</p>
            </form>
        </div>
        
        <NavBar />
    </>
  )
}
