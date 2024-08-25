import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
         document.cookie = `refreshToken=${response.data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax;`;

         //set accessToken
         return response.data.access_token;
      } catch(err) {
         console.log(err);
         // if (err.response && err.response.data.message) return rejectWithValue(err.response.data.message);
         // else if (err.message) return rejectWithValue(err.message);
         // else rejectWithValue('Unexpected error occured');
      }

   }
)