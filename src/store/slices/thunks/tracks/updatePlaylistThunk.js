import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const updatePlaylistThunk = createAsyncThunk(
   'tracks/updatePlaylistThunk',
   async({playlist, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
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
         const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlist.id}`, data, {
            headers: {
               'Authorization': `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
            }
         });         
         return response.data;
      } catch (err) {
         console.log(err);
         return asyncThunkError(err, thunkAPI.rejectWithValue);         
      }
   }
)