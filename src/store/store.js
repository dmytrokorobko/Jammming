import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import TracksSlice from "./slices/TracksSlice";

export const store = configureStore({
   reducer: {
      auth: AuthSlice,
      tracks: TracksSlice
   }
})