import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getGifsThunk } from "./giphyThunk";
import { GiphyState, GiphyGif } from "./giphyTypes";

const initialState: GiphyState = {
  gifs: {
    isLoading: false,
    isError: false,
    message: null,
    isSuccess: false,
    data: null,
  },
};

export const giphySlice = createSlice({
  name: "giphy",
  initialState,
  reducers: {
    toggleGifLock: (state, action: PayloadAction<string>) => {
      const gifId = action.payload;
      const gif = state.gifs.data?.find((gif) => gif.id === gifId);
      if (gif) {
        gif.isLocked = !gif.isLocked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGifsThunk.pending, (state) => {
        state.gifs.isLoading = true;
        state.gifs.isError = false;
        state.gifs.isSuccess = false;
        state.gifs.message = null;
      })
      .addCase(getGifsThunk.fulfilled, (state, action: PayloadAction<GiphyGif[]>) => {
        state.gifs.isLoading = false;
        state.gifs.isSuccess = true;
        state.gifs.data = action.payload;
      })
      .addCase(getGifsThunk.rejected, (state, action) => {
        state.gifs.isLoading = false;
        state.gifs.isError = true;
        state.gifs.message =
          typeof action.payload === "string" ? action.payload : "An error occurred";
      });
  },
});

export const { toggleGifLock } = giphySlice.actions;

// Selectors --------------------------------
export const selectGifs = (state: RootState) => state.giphy.gifs;

export default giphySlice.reducer;
