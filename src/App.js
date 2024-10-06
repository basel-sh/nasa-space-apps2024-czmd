
import Footer from "./Components/Footer"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Home from "./Home"
import MainDash from "./main"
import StarSystemRendering from "./SolarSystem"

export default function App(){
  return (
    <div className="mainappdiv">
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="" element={<MainDash/>}/>
          <Route path="StarSystemRendering" element={<StarSystemRendering />} />
        </Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}