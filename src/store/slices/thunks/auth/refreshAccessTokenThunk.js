import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const clientId = process.env.REACT_APP_CLIENT_ID;

export const refreshAccessTokenThunk = createAsyncThunk(
   'auth/refreshAccessTokenThunk',
   async({refreshToken}, {rejectWithValue}) => {
      try {
         const params = new URLSearchParams();
         params.append('grant_type', 'refresh_token');
         params.append('refresh_token', refreshToken);
         params.append('client_id', clientId);
         const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            }
         });

         if (response.data.access_token) {
            localStorage.setItem('expiresIn', Date.now() + response.data.expires_in * 1000);
            return response.data.access_token;
         } else rejectWithValue('Failed to refresh access token');
      } catch(err) {
         console.log(err);
         return rejectWithValue(err.response?.data?.message || 'An error occurred');
      }      
   }
)