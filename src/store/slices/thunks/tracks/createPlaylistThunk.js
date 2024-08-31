import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const createPlaylistThunk = createAsyncThunk(
   'tracks/createPlaylistThunk',
   async({playlist, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         const data = {
            "name": playlist.name,
            "description": "",
            "public": true
         };
         const response = await axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, data, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
            }
         });         
         return response.data.id;
      } catch (err) {
         console.log(err);
         return asyncThunkError(err, thunkAPI.rejectWithValue);         
      }
   }
)