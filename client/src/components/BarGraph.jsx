/* eslint-disable react/prop-types */
import '../styles/BarGraph.css'

export default function BarGraph({objDay,percentage}) {

    const objDay1= objDay;
    const {protein, carbs, fat} = objDay1;

    const colors = ["#99C8FF","#2866b2","#6880FF"]



    return (
      <>
        <h2 style={{textAlign:"center",margin:"0"}}>Your nutrients for today</h2>
        <div className = "BarGraph">
        {percentage.map((nut,index)=>(
          <div className='pie' key={index} style={{backgroundImage:`conic-gradient(${colors[index]} ${nut.percentage*3.6}deg,
          black 0)`}}>
            <div className='text'><p>{nut.percentage}</p></div>
            <p className='nutrientName' >{nut.name}</p>
          </div>
        ))}
        </div>
      </>
    )
}