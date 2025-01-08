import React from 'react'
import "../../styles/SurveyLink.css"
import { useNavigate } from 'react-router-dom'

export default function SurveyLink() {
  const navigate = useNavigate();

  return (
    <div id='surveyLink'>
        <button className='textButton' onClick={()=>navigate("/report-issue")}>Report an issue</button>
        <button className='importantTextButton' onClick={()=>navigate("/about-project")}>Learn about the project</button>
    </div>
  )
}
