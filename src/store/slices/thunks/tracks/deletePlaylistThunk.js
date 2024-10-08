import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const deletePlaylistThunk = createAsyncThunk(
   'tracks/deletePlaylistThunk',
   async({playlist, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlist.id}/followers`, {
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