import { useState } from 'react'
import RbxCoinsChangerSlider from './components/buyRbxCoinBox/rbxCoinsChangerSlider/RbxCoinsChangerSlider'
import BuyRbxCoinsBox from './components/buyRbxCoinBox/buyRbxCoinsBox/BuyRbxCoinsBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BuyRbxCoinsBox />
    </div>
  )
}

export default App
