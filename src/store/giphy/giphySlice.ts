import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getGifsThunk } from "./giphyThunk";
import { GiphyState, GiphyGif } from "./giphyTypes";

const initialState: GiphyState = {
  gifsStates: {
    isLoading: false,
    isError: false,
    message: null,
    isSuccess: false,
  },
  gifsArray: null,
};

export const giphySlice = createSlice({
  name: "giphy",
  initialState,
  reducers: {
    toggleGifLock: (state, action: PayloadAction<string>) => {
      const uniqueKey = action.payload;
      const gif = state.gifsArray?.find((gif) => gif.uniqueKey === uniqueKey);
      if (gif) {
        gif.isLocked = !gif.isLocked;
      }
    },
    addLoadingState: (state) => {
      if (state.gifsArray) {
        state.gifsArray = state.gifsArray.map((gif) => {
          if (gif.isLocked) return gif;
          return { ...gif, isLoading: true };
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGifsThunk.pending, (state) => {
        state.gifsStates.isLoading = true;
        state.gifsStates.isError = false;
        state.gifsStates.isSuccess = false;
        state.gifsStates.message = null;
      })
      .addCase(getGifsThunk.fulfilled, (state, action: PayloadAction<GiphyGif[]>) => {
        state.gifsStates.isLoading = false;
        state.gifsStates.isSuccess = true;

        // Merge new gifs with existing gifs
        const existingGifs = state.gifsArray || [];
        const newGifs = action.payload.map((gif, index) => ({
          ...gif,
          uniqueKey: `${gif.id}_${index}`,
        }));

        // If no existing gifs, set the new gifs as the data
        if (existingGifs.length === 0) {
          state.gifsArray = action.payload;
          return;
        }

        let newGifIndex = 0;

        state.gifsArray = existingGifs.map((gif) => {
          if (gif.isLocked) {
            return gif;
          } else {
            const newGif = newGifs[newGifIndex] || gif; // fallback if newGifs runs out
            newGifIndex++;
            return newGif;
          }
        });
      })
      .addCase(getGifsThunk.rejected, (state, action) => {
        state.gifsStates.isLoading = false;
        state.gifsStates.isError = true;
        state.gifsStates.message =
          typeof action.payload === "string" ? action.payload : "An error occurred";
      });
  },
});

export const { toggleGifLock, addLoadingState } = giphySlice.actions;

// Selectors --------------------------------
export const selectGifsStates = (state: RootState) => state.giphy.gifsStates;
export const selectGifs = (state: RootState) => state.giphy.gifsArray;

export default giphySlice.reducer;
