import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
   const dispatch = useDispatch();
   const accessToken = useSelector(state => state.auth.accessToken);
   const navigate = useNavigate();

   useEffect(() => {
      const handleLogout = async() => {
         document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Lax`;

         await dispatch(logout());
      }
      handleLogout();

      if (!accessToken) return navigate('/');
   }, [dispatch, accessToken, navigate]);

   return (
      <>
         <h1>Logout...</h1>
      </>
   )
}