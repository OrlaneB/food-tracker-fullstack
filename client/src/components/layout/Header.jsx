import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate();

  return (
    <header>
        <h2 onClick={()=>navigate("/")}>Food Pulse</h2>

        <nav>
        <button className='roundButton' 
            onClick={()=>navigate("/add-meal")}>
          <i className="fi fi-rr-add"></i>
        </button>

        <button className='roundButton' 
            onClick={()=> navigate("/profile")}>
          <i className="fi fi-rr-user"></i>
        </button>
        
      </nav>

    </header>
  )
}
