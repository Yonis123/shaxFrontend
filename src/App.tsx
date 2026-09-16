import {Routes, Route} from 'react-router'
import GamePage from "./Routes/GamePage"
import HomePage from "./Routes/HomePage"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/rooms/:roomId" element={<GamePage/>} />
        <Route path="/HomePage" element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App
