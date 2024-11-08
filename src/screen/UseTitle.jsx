import {useState} from 'react'

export default function UseTitle(props) {
    const [count,setCount]=useState(0)
   function handleIncrement(){
       setCount(count+1)
       handleTitle()
    }
    function handleDecrement(){
        setCount(count-1)
        handleTitle()
     }
     function handleTitle(){
       document.title='count : '+(count+1)
         }
return {
    count,
    handleIncrement,
    handleDecrement,
    
}
}
