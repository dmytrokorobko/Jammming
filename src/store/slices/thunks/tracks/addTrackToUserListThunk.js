import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTrackToUserListThunk = createAsyncThunk(
   'tracks/addTrackToUserListThunk',
   async({playlist, track, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      console.log(accessToken);

      try {
         const data = {
            "uris": ["spotify:" + track.type + ":" + track.id]
         };
         console.log(data);
         const response = await axios.post('https://api.spotify.com/v1/playlists/' + playlist.id + '/tracks', data, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type' : 'application/json'
               }
         });
         
         console.log(response.data);
         //return getExtractedTracks(response.data.tracks.items);
      } catch (err) {
         console.log(err);
         return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occurred');
      }
   }
)