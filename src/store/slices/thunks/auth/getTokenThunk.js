import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

export const getTokenThunk = createAsyncThunk(
   'auth/getTokenThunk',
   async({code, codeVerifier}, {rejectWithValue}) => {
      try {
         const params = new URLSearchParams();
         params.append('grant_type', 'authorization_code');
         params.append('code', code);
         params.append('redirect_uri', redirectUri);
         params.append('client_id', clientId);
         params.append('code_verifier', codeVerifier);
         const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            }
         });

         //set refreshToken
         //to cookie
         //document.cookie = `refreshToken=${response.data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax;`;
         //to sessionStorage
         sessionStorage.setItem('refreshToken', response.data.refresh_token);
         localStorage.setItem('expiresIn', Date.now() + response.data.expires_in * 1000);
         window.history.replaceState({}, document.title, '/');

         //set accessToken
         return response.data.access_token;
      } catch(err) {
         console.log(err);
         return asyncThunkError(err, rejectWithValue);
      }

   }
)