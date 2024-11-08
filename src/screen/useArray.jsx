import { useState } from "react"

export default function useArray(value) {
  const [array, setArray] = useState(value)

  function push(element) {
    setArray([...array, element])
  }
  function remove(index) {  
    setArray([...array.slice(0, index)])
  }
  function update(index, newElement) {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ])
  }
  return { array, setArray, push, remove,update}
}