import React,{useState} from 'react'
import UseTitle from './UseTitle';
import useArray from './useArray';
import useTimer from './useTimer';
import MainLayout from "../components/MainLayout";      
function CustomHooks() {
  const [val, setVal] = useState(0)
  
  const seconds =useTimer()

  const { array, setArray, push,remove,update } = useArray([
    1,2,3,4,5,6,7
  ])
  const data =UseTitle();

  return (
    <div>
      <MainLayout>
          <h1>Counter Custom Hook</h1>
            <button onClick={data.handleDecrement}>count - </button>&nbsp;&nbsp;&nbsp;&nbsp;
            {data.count}&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={data.handleIncrement}>count + </button>

          <h1>Array Custom Hook</h1>
          <div>{array.join(", ")}</div>
          <input type="number" onChange={(e)=>setVal(e.target.value)} /><br /><br />
            <button onClick={() => push(val)}>Add {val}</button>
            <button onClick={() => setArray([1,2,3,3,4,5,6])}>Set To 1, 2, 3, 3, 4, 5, 6</button>
            <button onClick={() => remove(val)}>remove</button>
            <button onClick={() => update(3, val)}>Change Element To {val}</button><br /><br />

            <h1>timer</h1>
            <div>{seconds}</div>
      </MainLayout>
    </div>
  )
};

export default CustomHooks