import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getExtractedTracks } from "../../../../helper/getExtractedTracks";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const getFilterThunk = createAsyncThunk(
   'tracks/getFilterThunk',
   async({filterText, existedSpotifyTracks = null, filterLimit = 15, filterOffset = 0, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      if (!filterText) return;

      try {
         filterText = filterText.split(' ').join('+');
         const response = await axios.get('https://api.spotify.com/v1/search?q=' + filterText + '&type=album%2Cartist%2Ctrack&limit=' + filterLimit + '&offset=' + filterOffset, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
         });
         const newList = getExtractedTracks(response.data.tracks.items);
         if (existedSpotifyTracks) newList.unshift(...existedSpotifyTracks);
         return newList;
      } catch (err) {
         console.log(err);
         return asyncThunkError(err, thunkAPI.rejectWithValue);         
      }
   }
)