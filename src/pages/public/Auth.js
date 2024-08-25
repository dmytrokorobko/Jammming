import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenThunk } from "../../store/slices/thunks/auth/getTokenThunk";
import { useEffect, useState } from "react";

const getCookie = (name) => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
   return null;
}

export const Auth = () => {
   const code = new URLSearchParams(window.location.search).get('code'); 
   const codeVerifier = getCookie('codeVerifier');
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [navigateTo, setNavigateTo] = useState('');   

   useEffect(() => {
      if (!code) {
         console.log('No authentification code found in URL');
         setNavigateTo('/');
         return;
      }

      if (!codeVerifier) {
         console.log('No codeVerifier found in cookies');
         setNavigateTo('/');
         return;
      }

      const handleAuth = async() => {
         try {
            await dispatch(getTokenThunk({code, codeVerifier}));
            setNavigateTo('/dashboard');            
         } catch(err) {
            console.log(err);
            setNavigateTo('/');
         }
      }

      handleAuth();      
   }, [dispatch, code, codeVerifier]);

   useEffect(() => {
      if (navigateTo) return navigate(navigateTo);
   }, [navigate, navigateTo]);
   
   return (
      <>
         <h1>Authenticating...</h1>
      </>
   )
   
}