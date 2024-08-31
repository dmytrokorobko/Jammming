import { createSlice } from "@reduxjs/toolkit";
import { getRecommendationThunk } from "./thunks/tracks/getRecommendationThunk";
import { getFilterThunk } from "./thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "./thunks/tracks/getUserPlaylistsThunk";
import { getPlaylistTracksThunk } from "./thunks/tracks/getPlaylistTracksThunk";
import { addTrackToUserListThunk } from "./thunks/tracks/addTrackToUserListThunk";
import { createPlaylistThunk } from "./thunks/tracks/createPlaylistThunk";
import { deletePlaylistThunk } from "./thunks/tracks/deletePlaylistThunk";
import { removeTrackFromUserListThunk } from "./thunks/tracks/removeTrackFromUserListThunk";

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
      clearServerError: (state) => {
         state.error = null;
      },
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
         state.selectedPlaylist = state.userPlaylists[index];
      },
      removePlaylistName: (state, action) => {
         state.userPlaylists = state.userPlaylists.filter(playlist => playlist.id !== action.payload.id && playlist.name !== action.payload.name);
      },
      addTrackToSelectedPlaylist: (state, action) => {
         if (!state.selectedPlaylist) {
            state.error = 'No selected playlist to add this track';
            return;
         } 
         if (!state.playlistTracks) state.playlistTracks = [];
         if (state.playlistTracks.some(track => track.id === action.payload.id)) {
            state.error = 'Selected track is already in your playlist';
            state.spotifyTracks = state.spotifyTracks.filter(track => track.id !== action.payload.id);
            return;
         } 
         state.playlistTracks.push(action.payload);
         state.spotifyTracks = state.spotifyTracks.filter(track => track.id !== action.payload.id);
      },
      removeTrackFromSelectedPlaylist: (state, action) => {
         state.playlistTracks = state.playlistTracks.filter(track => track.id !== action.payload.id);

         if (!state.spotifyTracks) state.spotifyTracks = [];
         if (!state.spotifyTracks.some(track => track.id === action.payload.id)) {
            state.spotifyTracks.unshift(action.payload);
         } 
      },
      removeSpotifyTrackFromPlaylist: (state, action) => {
         state.spotifyTracks = state.spotifyTracks.filter(track => track.id !== action.payload.id);
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
         //createPlaylistThunk
         .addCase(createPlaylistThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createPlaylistThunk.fulfilled, (state, action) => {
            state.loading = false;     
            state.userPlaylists = state.userPlaylists.map(pl => 
               (pl.id === action.meta.arg.playlist.id && pl.name === action.meta.arg.playlist.name) 
               ? {...pl, id: action.payload} 
               : pl);
         })
         .addCase(createPlaylistThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //deletePlaylistThunk
         .addCase(deletePlaylistThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deletePlaylistThunk.fulfilled, (state, action) => {
            state.loading = false;
            //do nothing, because reducer already did            
         })
         .addCase(deletePlaylistThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //addTrackToUserListThunk
         .addCase(addTrackToUserListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(addTrackToUserListThunk.fulfilled, (state, action) => {
            state.loading = false;            
            //do nothing, because reducer already did
         })
         .addCase(addTrackToUserListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //removeTrackFromUserListThunk
         .addCase(removeTrackFromUserListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(removeTrackFromUserListThunk.fulfilled, (state, action) => {
            state.loading = false;            
            //do nothing, because reducer already did
         })
         .addCase(removeTrackFromUserListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
});

export default TracksSlice.reducer;
export const {clearServerError, selectPlaylist, clearSelectedPlaylist, createPlaylistName, updatePlaylistName,removePlaylistName, addTrackToSelectedPlaylist, removeTrackFromSelectedPlaylist, removeSpotifyTrackFromPlaylist} = TracksSlice.actions;