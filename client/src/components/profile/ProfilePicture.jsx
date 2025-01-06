import React from 'react'

export default function ProfilePicture() {
  return (
    <div id='profileImage'>

        <img 
            src='/avatar-default.jpg'
            alt='Default profile picture'
        />

        <button
            className='roundButton'
            disabled
            title='Available in later update'
            style={{backgroundColor:"lightgray"}}
        >
            <i className='fi fi-rr-refresh'></i>
        </button>
    </div>
  )
}
