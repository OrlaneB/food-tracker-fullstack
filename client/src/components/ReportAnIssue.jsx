import React, { useRef, useState } from 'react'
import "../styles/ReportAnIssue.css"
import emailjs from '@emailjs/browser';


export default function ReportAnIssue() {

    const [emailContent,setEmailContent] = useState({subject:"",user_email:"",message:""})

    function handleChange(event){
        event.preventDefault();

        const {name,value} = event.target;

        let newEmail = {...emailContent};
        newEmail[name]=value;
        setEmailContent(newEmail);
    }

    function sendEmail(event){
        event.preventDefault();

        emailjs.send("service_ud2avvf","template_v0or54r", emailContent, {
            publicKey:"2pCVkwzThpV3GNUkY"
        })
        .then(()=>{
            console.log("Success!");
            setEmailContent({subject:"",user_email:"",message:""})
        })
        .catch((err)=>{
            console.log(err)
        })

        
    }

  return (
    <form id='reportAnIssue' onSubmit={(event)=>sendEmail(event)}>
        <h2>Report an issue</h2>

        <label>
            <p>Subject</p>
            <input type='text' placeholder='Bug on this feature...' name='subject' onChange={(event)=>handleChange(event)} value={emailContent.subject}/>
        </label>

        <label>
            <p>Email to follow up <i>(not required)</i></p>
            <input type='email' placeholder='myname@gmail.com' name='user_email' onChange={(event)=>handleChange(event)} value={emailContent.user_email}/>
        </label>

        <label>
            <p>Message </p>
            <textarea placeholder="I noticed that..." name='message' onChange={(event)=>handleChange(event)} value={emailContent.message}/>
        </label>

        <button className='textButton' type='submit'>Send</button>
    </form>
  )
}
