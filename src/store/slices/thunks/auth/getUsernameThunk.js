import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsernameThunk = createAsyncThunk(
   'auth/getUsernameThunk',
   async({navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) return navigate('/login');
      
      try {
         const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
               'Authorization': `Bearer ${accessToken}`
            }
         });
         return response.data;
      } catch (err) {
         console.log(err);
      }
   }
)