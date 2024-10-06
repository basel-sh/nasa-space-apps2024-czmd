import TopBar from "./Components/TopBar"
import ToolsBar from "./Components/ToolsBar"
import { Outlet } from "react-router-dom";


export default function Dashboard(){
  return(
    <div>
      <TopBar/>
      <ToolsBar/>
      <canvas id="draw"></canvas>
      <Outlet />
    </div>
  )
}