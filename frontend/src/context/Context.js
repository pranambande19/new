import React, { createContext, useState } from "react";

export const ContexCounter = createContext(null);

export const ContexProvider = (props)=>{
    const [count, setCount] = useState(9);
    return(
        <ContexCounter.Provider value={{count, setCount, name: "Context API Example"}}>
            {props.children}
        </ContexCounter.Provider>
    )
}

