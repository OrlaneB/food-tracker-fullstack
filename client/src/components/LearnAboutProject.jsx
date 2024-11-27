import React from 'react'

import "../styles/LearnAboutProject.css"

export default function LearnAboutProject() {

    const techStack = ["React","Node.js","MySQL","Express","Luxon"]

  return (
    <div id='aboutProject'>

        <h2>The Foodpulse Project</h2>

        <a href='https://github.com/OrlaneB/food-tracker-fullstack' target='_blank' style={{display:"flex",justifyContent:"center",textDecoration:"none",color:"#951327"}}>
            <p>See the GitHub repository here</p>
            <button className='roundButton'><i className='fi fi-brands-github'></i></button>
        </a>
        

        <p style={{margin:"40px 20%"}}>The inspiration for Food Pulse came from one of the app developers Laura Castro.<br/> Her friend's daughter had been diagnosed with anemia. This sparked a deep dive into iron deficiency, during which she came across an article discussing how pairing certain foods can maximize nutrient absorption. And voilà! She brought the idea to her classmate, Orlane Brun, who enthusiastically joined her in creating this helpful tool. <br/><br/>

        Together, we developed Food Pulse to provide personalized insights into nutrient intake. Through collaboration and careful planning, we designed an application to meet diverse dietary needs while making nutrition tracking accessible and user-friendly</p>

        <p style={{fontWeight:"bold"}}>Try for free until February 10th!</p>

        <div id='techStack'>
            <h3>Tech stack</h3>
            <ul>
                {techStack.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>

        <h3>The contributors</h3>
        <div id='contributors'>
            <div>
                <h4>Laura Castro</h4>
                <img src='profilePictureLauraCastro.png'/>
                <p>lauracastrotech@gmail.com</p>
                <a href='https://github.com/lauracastrotech' target="_blank">
                    <button className='roundButton'>
                        <i className="fi fi-brands-github"></i>
                    </button>
                </a>
                <a href='https://www.linkedin.com/in/lccastro/' target='_blank'>
                    <button className='roundButton'>
                        <i className="fi fi-brands-linkedin"></i>
                    </button>
                </a>
            </div>

            <div>
                <h4>Orlane Brun</h4>
                <img src='profilePictureOrlaneBrun.jpg'/>
                <p>orlane.brun@free.fr</p>
                <a href='https://github.com/lauracastrotech' target="_blank">
                    <button className='roundButton'>
                        <i className="fi fi-brands-github"></i>
                    </button>
                </a>
                <a href='https://www.linkedin.com/in/lccastro/' target='_blank'>
                    <button className='roundButton'>
                        <i className="fi fi-brands-linkedin"></i>
                    </button>
                </a>
            </div>
        </div>
    </div>
  )
}
