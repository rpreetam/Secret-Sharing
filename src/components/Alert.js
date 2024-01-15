import React, {useContext} from "react";
import alertContext from "../context-alert/alertContext";


export const Alert  = (props) =>{
    const context = useContext(alertContextContext);
    const { alert } = context;
    const capitalize = (word)=>{
        if (word=== 'danger'){
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return(
            <div style={{height: '50px'}}>
                {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(alert.type)}</strong> : {alert.msg }

            </div>}
        </div>
    )
}