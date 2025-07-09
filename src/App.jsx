import { useState } from 'react'
import BillCutCalculator from './Bill/bill'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BillCutCalculator/>
    </>
  )
}

export default App
