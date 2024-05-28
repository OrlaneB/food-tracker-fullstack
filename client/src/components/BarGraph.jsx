/* eslint-disable react/prop-types */
import '../styles/BarGraph.css'

export default function BarGraph({objDay}) {
    //const [test,setTest] = useState({});
    // const [count,setCount] = useState([1,2,3])
    // copy dummy data
    const objDay1= objDay;
    const {protein, carbs, fat} = objDay1;

    return (
      <div className = "BarGraph">
        <p>{protein}</p> 
        <p>{carbs}</p>
        <p>{fat}</p>
      </div>
    )
}