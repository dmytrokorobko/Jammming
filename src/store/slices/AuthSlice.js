import { createSlice } from "@reduxjs/toolkit";
import { getTokenThunk } from "./thunks/auth/getTokenThunk";
import { getUsernameThunk } from "./thunks/auth/getUsernameThunk";
import { refreshAccessTokenThunk } from "./thunks/auth/refreshAccessTokenThunk";

const AuthSlice = createSlice({
   name: 'auth',
   initialState: {
      accessToken: null,
      user: {
         name: null,
         urlSpotify: null,
         avatar: null
      },
      loading: false,
      error: null
   },
   reducers: {
      logout: (state) => {
         state.accessToken = null;
         state.user.name = null;
         state.user.urlSpotify = null;
         state.user.avatar = null;
         state.loading = false;
         state.error = null;
      }
   },
   extraReducers: (builder) => {
      builder
         //getTokenThunk
         .addCase(getTokenThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getTokenThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload;
         })
         .addCase(getTokenThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //getUsernameThunk
         .addCase(getUsernameThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getUsernameThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user.name = action.payload.display_name;
            state.user.urlSpotify = action.payload.external_urls.spotify;
            state.user.avatar = action.payload.images[1].url;
         })
         .addCase(getUsernameThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //refreshAccessTokenThunk
         .addCase(refreshAccessTokenThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload;
         })
         .addCase(refreshAccessTokenThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
});

export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;