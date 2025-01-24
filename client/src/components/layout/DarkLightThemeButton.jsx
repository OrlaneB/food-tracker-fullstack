import React, { useState, useEffect } from 'react'

export default function DarkLightThemeButton() {

    const [theme,setTheme] = useState("light");

    function checkSystemPreferenceDark(){
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
          setTheme("dark");
      }
    }

    useEffect(()=>{
      checkSystemPreferenceDark();
      document.body.dataset.theme = theme
    },[])

    useEffect(() => {
      document.body.dataset.theme = theme
    }, [theme])

  return (
    <button className='roundButton'
        onClick={()=>setTheme(theme==="light"?"dark":"light")}>
        {theme==="dark" ?
        <i className='fi fi-rr-brightness'></i>  :
        <i className='fi fi-rr-moon'></i>
    }
    </button>
  )
}
