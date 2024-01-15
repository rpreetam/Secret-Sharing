import AlertContext from "./alertContext";
import React, { useState } from "react";

const AlertState = ({children})=>{

    const [alert, setAlert] = useState(null);
    const showAlert = (message, type)=> {
        setAlert({msg: message, type: type})
        setTimeout(()=>{
          setAlert(null);
        },1500);
      }

    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {children}
        </AlertContext.Provider>
    )
}
export default AlertState