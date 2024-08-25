import { createSlice } from "@reduxjs/toolkit";
import { getTokenThunk } from "./thunks/auth/getTokenThunk";
import { getUsernameThunk } from "./thunks/auth/getUsernameThunk";

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
   }
});

export const {setCodeVerifier} = AuthSlice.actions;
export default AuthSlice.reducer;