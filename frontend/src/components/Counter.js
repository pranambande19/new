import React, { useContext } from 'react'
import { ContexCounter } from '../context/Context';

const Counter = () => {

    const counterContecxt = useContext(ContexCounter);
  return (
    <div>
        <button onClick={()=>counterContecxt.setCount(counterContecxt.count + 1)}>Increment</button>
        <button onClick={()=>counterContecxt.setCount(counterContecxt.count - 1)}>Decrement</button>
    </div>
  )
}

export default Counter