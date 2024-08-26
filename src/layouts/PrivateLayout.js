import { Outlet } from "react-router-dom";
import '../CSS/private.css';

export const PrivateLayout = () => {
   return (
      <div className="PrivateApp">
         <Outlet />
      </div>
   )
}