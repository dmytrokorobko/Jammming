import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getExtractedTracks } from "../../../../helper/getExtractedTracks";

export const getRecommendationThunk = createAsyncThunk(
   'tracks/getRecommendationThunk',
   async({navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         const response = await axios('https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=New+Releases&seed_tracks=0c6xIDDpzE81m2q797ordA', {
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
         });
         
         return getExtractedTracks(response.data.tracks.items);
      } catch (err) {
         console.log(err);
         return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occurred');
      }
   }
)