import { createSlice } from "@reduxjs/toolkit";
import { getRecommendationThunk } from "./thunks/tracks/getRecommendationThunk";
import { getFilterThunk } from "./thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "./thunks/tracks/getUserPlaylistsThunk";
import { getPlaylistTracksThunk } from "./thunks/tracks/getPlaylistTracksThunk";

const TracksSlice = createSlice({
   name: 'tracks',
   initialState: {
      spotifyTracks: null,
      userPlaylists: null,
      selectedPlaylist: null,
      playlistTracks: null,
      loading: false,
      error: null
   },
   reducers: {
      selectPlaylist: (state, action) => {
         state.selectedPlaylist = action.payload;
         state.playlistTracks = null;
      },
      clearSelectedPlaylist: (state) => {
         state.selectedPlaylist = null;
         state.playlistTracks = null;
      },
      createPlaylistName: (state, action) => {
         state.userPlaylists.push(action.payload);
      },
      updatePlaylistName: (state, action) => {
         const {id, name} = action.payload;
         const index = state.userPlaylists.findIndex(playlist => playlist.id === id);
         if (index !== -1) state.userPlaylists[index].name = name;
      }
   },
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
         //getPlaylistTracksThunk
         .addCase(getPlaylistTracksThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getPlaylistTracksThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.playlistTracks = action.payload;
         })
         .addCase(getPlaylistTracksThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
});

export default TracksSlice.reducer;
export const {selectPlaylist, clearSelectedPlaylist, createPlaylistName, updatePlaylistName} = TracksSlice.actions;