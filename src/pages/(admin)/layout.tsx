import { Outlet } from "react-router-dom"
import SideBar from "./_component/sidebar"
import NavBar from "./_component/navbar"

const LayoutAdmin = () => {
  return (
    <div>
      <NavBar />
      <div className="content-dashboard">
        <SideBar />
        <Outlet />
        </div>
    </div>
  )
}

export default LayoutAdmin