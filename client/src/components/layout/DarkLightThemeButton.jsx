import React, { useState } from 'react'
import { useMediaQuery } from "react-responsive";

export default function DarkLightThemeButton() {

    const [isDark,setIsDark] = useState(false);
    const [theme,setTheme] = useState("light");

    // const systemPrefersDark = useMediaQuery(
    //     {
    //         query: "(prefers-color-scheme: dark)",
    //     },
    //     undefined,
    //     (isSystemDark) => setIsDark(isSystemDark)
    // );

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
