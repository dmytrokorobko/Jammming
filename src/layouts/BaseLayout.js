import { Outlet } from "react-router-dom"
import '../CSS/base.css';

export const BaseLayout = () => {
   return (
      <div className="PublicApp">
         <Outlet />
      </div>
   )
}