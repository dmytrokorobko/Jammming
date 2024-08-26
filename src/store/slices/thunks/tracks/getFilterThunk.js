import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFilterThunk = createAsyncThunk(
   'tracks/getFilterThunk',
   async({filterText, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      if (!filterText) return;

      try {
         filterText = filterText.split(' ').join('+');
         const response = await axios('https://api.spotify.com/v1/search?q=' + filterText + '&type=album%2Cartist%2Ctrack', {
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
         });
         
         const extractedTracks = response.data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            uri: track.uri
         }));

         return extractedTracks;
      } catch (err) {
         console.log(err);
         return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occurred');
      }
   }
)