/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//This should be on its own component
export default function NavBar({changeView}) {

    return (
      <div className= "NavBar">
        <button onClick = {() => changeView('Homepage')}><i className="fi fi-rr-home"></i></button>
        <button onClick = {() => changeView('AddMeal')}><i className="fi fi-rr-add"></i></button>
        <button onClick = {() => changeView('Profile')}><i className="fi fi-rr-user"></i></button>
      </div>
    )
  }