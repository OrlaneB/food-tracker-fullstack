/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//This should be on its own component

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  let navigate = useNavigate();

    return (
      <div className= "NavBar">
        {/* <button><Link to={"/"}><i className="fi fi-rr-home"></i></Link></button>
        <button><Link to={"/add-meal"}><i className="fi fi-rr-add"></i></Link></button>
        <button ><Link to={"/profile"}><i className="fi fi-rr-user"></i></Link></button> */}

        <button onClick={()=>navigate("/")}><i className="fi fi-rr-home"></i></button>
        <button onClick={()=>navigate("/add-meal")}><i className="fi fi-rr-add"></i></button>
        <button onClick={()=>navigate("/profile")} ><i className="fi fi-rr-user"></i></button>
      </div>
    )
  }