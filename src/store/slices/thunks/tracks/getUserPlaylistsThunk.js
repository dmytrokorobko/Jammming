import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPlaylistsThunk = createAsyncThunk(
   'tracks/getUserPlaylistsThunk',
   async({navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         const response = await axios('https://api.spotify.com/v1/me/playlists', {
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
         });
         
         const extractedPlaylists = response.data.items.map(track => ({
            id: track.id,
            name: track.name,
         }));

         return extractedPlaylists;
      } catch (err) {
         console.log(err);
         return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occurred');
      }
   }
)