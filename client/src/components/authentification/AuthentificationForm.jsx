import React, { useState } from 'react'
import SubmitButton from './SubmitButton'

export default function AuthentificationForm({credentials,setCredentials,type}) {

    const [errorMessage,setErrorMessage] = useState("");

    function handleChange(event){
        const {name,value} = event.target;

        setCredentials(prev => ({...prev, [name]:value}));
    }

  return (
    <form>

        <label>
            Your username

            <input 
                type='text'
                name='username'
                value={credentials.username}
                autoComplete='username'
                onChange={(event)=>handleChange(event)}
            />
        </label>

        <label>
            Your password

            <input 
                type='password'
                name='password'
                value={credentials.password}
                autoComplete='password'
                onChange={(event)=>handleChange(event)}
            />
        </label>

        <p>{errorMessage}</p>

        <SubmitButton type={type} credentials={credentials} setErrorMessage={setErrorMessage} setCredentials={setCredentials}/>

    </form>
  )
}
