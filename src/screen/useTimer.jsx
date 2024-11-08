import { useState, useEffect } from 'react';

function useTimer() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
            setCount((prevCount) =>{ 
                 return prevCount + 1
                });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return count;
  }
  
  export default useTimer;