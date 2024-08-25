import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameThunk } from "../../store/slices/thunks/auth/getUsernameThunk";
import { Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {
   const user = useSelector(state => state.auth.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getUsernameThunk({navigate}));
   },[dispatch, navigate]);

   console.log(user.name);
   return (
      <>
         <header>
            <h1>Dashboard</h1>
         </header>
         <section>
            <h2>Hello, {user.name ? (<Link to={user.urlSpotify} target="_blank"><img src={user.avatar} alt="avatar"/>{user.name}</Link>) : 'guest'}</h2>
         </section>
         <footer>

         </footer>
      </>
   )
}