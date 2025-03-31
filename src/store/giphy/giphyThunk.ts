import { createAsyncThunk } from "@reduxjs/toolkit";
import { internalApiEndpoints } from "@/axios/endpoints";
import axios from "axios";
import { GiphyGif } from "./giphyTypes";

export const getGifsThunk = createAsyncThunk(
  "giphy/getGifsThunk",
  async (quantity: number, thunkAPI) => {
    try {
      const resp = await axios.get(internalApiEndpoints.getGifs(quantity));
      const gifs = resp.data as GiphyGif[];
      const sortedAndKeyedGifs = [...gifs]
        .sort(
          (a, b) => new Date(b.import_datetime).getTime() - new Date(a.import_datetime).getTime()
        )
        .map((gif) => ({
          ...gif,
          uniqueKey: `${gif.id}_${crypto.randomUUID()}`,
        }));
      return sortedAndKeyedGifs;
    } catch {
      return thunkAPI.rejectWithValue("Could not get the gifs :(");
    }
  }
);
