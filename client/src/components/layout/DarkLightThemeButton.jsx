import React, { useState } from 'react'

export default function DarkLightThemeButton() {

    const [theme,setTheme] = useState("light");

    React.useEffect(() => {
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
