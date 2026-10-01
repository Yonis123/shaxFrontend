import {Routes, Route} from 'react-router'
import HomePage from "./Routes/HomePage"
import GamePage from "./Routes/GamePage"




function App() {
  


  return (
    <>
     <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<GamePage/>} />
      </Routes>
    </>
  )
}

export default App
