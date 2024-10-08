import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const addTrackToUserListThunk = createAsyncThunk(
   'tracks/addTrackToUserListThunk',
   async({playlist, track, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         const data = {
            "uris": ["spotify:" + track.type + ":" + track.id]
         };
         const response = await axios.post('https://api.spotify.com/v1/playlists/' + playlist.id + '/tracks', data, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type' : 'application/json'
               }
         });
         return response.data;         
      } catch (err) {
         console.log(err);
         return asyncThunkError(err, thunkAPI.rejectWithValue);         
      }
   }
)