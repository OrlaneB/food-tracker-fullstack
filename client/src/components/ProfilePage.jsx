import React from 'react'
import NavBar from "./NavBar"
import Profile from './Profile';
import Login from './Register';


export default function ProfilePage() {

    //Later, it will be taken from AUthContext
    const isLoggedIn = true;

  return (
    <div>
        {isLoggedIn &&
            <Profile />
        }
        {!isLoggedIn &&
            <Login />
        }
         <NavBar/>
    </div>
  )
}
