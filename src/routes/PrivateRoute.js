import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
   const accessToken = useSelector(state => state.auth.accessToken);
   const username = useSelector(state => state.auth.user.name);
   const location = useLocation();
   
   if (!accessToken && !username) return <Navigate to='/login' replace state={{from: location}} />;

   return <Outlet />;
}