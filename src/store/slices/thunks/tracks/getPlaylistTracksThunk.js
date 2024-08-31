import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { asyncThunkError } from "../../../../helper/asyncThunkError";

export const getPlaylistTracksThunk = createAsyncThunk(
   'tracks/getPlaylistTracksThunk',
   async({playlistId, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
         console.log('Token is not defined');
         return navigate('/login');
      } 

      try {
         if (playlistId.substr(0,5) === 'local') return;
         const response = await axios('https://api.spotify.com/v1/playlists/' + playlistId, {
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
         });
                  
         const extractedTracks = response.data.tracks.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map(artist => artist.name).join(', '),
            album: item.track.album.name,
            type: item.track.type
         }));

         return extractedTracks;
      } catch (err) {
         console.log(err);
         return asyncThunkError(err, thunkAPI.rejectWithValue);         
      }
   }
)