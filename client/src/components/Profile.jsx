/* eslint-disable no-unused-vars */

/* Profile
This screen should have the following:
- Username
- Avatar/ image
- Medical condition
- Data preferences: nutrient list, medical condition - has state
- Age, gender, weight, height - has state
- Link your device
*/
import { useState } from 'react'
import '../styles/Profile.css'

export default function Profile() {

 // create body information state
 const [age, setAge] = useState(34);
 //Add a function to age the user on its birthday (we'd need to get the birth date)
 const [height, setHeight] = useState('5\'7');
 const [weight, setWeight] = useState('165');
 const [nutrients, setNutrients] = useState(['protein','totalFat','carbohydrate', 'caffeine', 'sugars'])
//  const [nutrients, setNutrients] = useState([
//     {protein:false},
//     {totalFat:false},
//     {carbohydrate:false},
//     {caffeine:false},
//     {sugar:false},
//  ])
 const [username, setUserName] = useState('');

 //Level of activity

    return (
        <div className="profile">
            <div className="info">
                <h1>@Laura</h1>
                <img src="https://tinyurl.com/y8kt5xam" alt="Ruth Asawa sitting next to her art" />
                <button>Change image</button>
                <h2>Medical Condition: Anemia</h2>
            </div>
            <div className='info2'>
                <div className="details">
                    <p>{age}</p>
                    <p>{height}</p>
                    <p>{weight}</p>
                </div>
                {/* <div className="nutrients"> */}
                    <ul className="nutrients">
                        {/* <li>test</li> */}
                        {nutrients.map((nutrient) => (
                            <div key={nutrient}>
                                <input type='checkbox' />
                                <label>{nutrient}</label>
                            </div>
                          
                        ))}
                    </ul>
                {/* </div> */}
            </div>
        </div>
    )
}

