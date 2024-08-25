import { useDispatch } from "react-redux";
import { generateCodeChallenge } from "../../helper/generateCodeChallenge";
import { generateCodeVerifier } from "../../helper/generateCodeVerifier";
import { useEffect } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

export const Login = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const handleLogin = async () => {
         const scopes = 'user-read-private playlist-modify-private playlist-modify-public';

         const codeVerifier = generateCodeVerifier(64);
         const codeChallenge = await generateCodeChallenge(codeVerifier);
         
         //store to cookie
         document.cookie = `codeVerifier=${codeVerifier}; path=/;`;

         const authUrl = new URL("https://accounts.spotify.com/authorize");
         const params = {
            response_type: 'code',
            client_id: clientId,
            scopes,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
         }

         authUrl.search = new URLSearchParams(params).toString();
         window.location.href = authUrl.toString();            
      }
      handleLogin();
   }, [dispatch]);

   return (
      <>
         <h1>Loging...</h1>
      </>
   )
}