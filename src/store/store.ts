import { configureStore } from "@reduxjs/toolkit";
import giphyReducer from "./giphy/giphySlice";

export const store = configureStore({
  reducer: {
    giphy: giphyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
