/* eslint-disable react/prop-types */
import '../styles/BarGraph.css'

export default function BarGraph({objDay,percentage}) {

    const objDay1= objDay;
    const {protein, carbs, fat} = objDay1;

    



    return (
      <div className = "BarGraph">
        {percentage.map((nut,index)=>(
          <div className='pie' key={index} style={{backgroundImage:`conic-gradient(lightblue ${nut.percentage*3.6}deg,
          rgb(89, 89, 89) 0)`}}>
            <div className='text'><p>{nut.percentage}</p></div>
            <p className='nutrientName' >{nut.name}</p>
          </div>
        ))}
      </div>
    )
}