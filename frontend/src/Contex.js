import React, { useContext } from 'react'
import Counter from './components/Counter'
import { ContexCounter } from './context/Context';


const Contex = () => {
    const contextState = useContext(ContexCounter);
    console.log("contextState", contextState);
    
  return (
    <div>
        <h1>Count is {contextState.count}</h1>
        <Counter />
        <Counter />
        <Counter />
        <Counter />
    </div>
  )
}

export default Contex