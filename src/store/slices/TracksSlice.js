import { createSlice } from "@reduxjs/toolkit";
import { getRecommendationThunk } from "./thunks/tracks/getRecommendationThunk";
import { getFilterThunk } from "./thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "./thunks/tracks/getUserPlaylistsThunk";

const TracksSlice = createSlice({
   name: 'tracks',
   initialState: {
      spotifyTracks: null,
      userPlaylists: null,
      userTracks: null,
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: builder => {
      builder
         //getRecommendationThunk
         .addCase(getRecommendationThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getRecommendationThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.spotifyTracks = action.payload;            
         })
         .addCase(getRecommendationThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //getFilterThunk
         .addCase(getFilterThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getFilterThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.spotifyTracks = action.payload;            
         })
         .addCase(getFilterThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //getUserPlaylistsThunk
         .addCase(getUserPlaylistsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getUserPlaylistsThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.userPlaylists = action.payload;            
         })
         .addCase(getUserPlaylistsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
});

export default TracksSlice.reducer;
