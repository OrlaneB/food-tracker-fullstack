import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavigateToOtherType({type}) {

    const navigate = useNavigate();

  return (
    <>
    {type==="login" &&
    <p
        onClick={()=>navigate("/register")}
        className='navigateToOtherType'
    >
        Don't have an account ? Sign up here
    </p>
    }

    {type==="register" &&
    <p
        onClick={()=>navigate("/login")}
        className='navigateToOtherType'
    >
        Already have an account ? Log in
    </p>
    }
    </>
  )
}
