import { createAsyncThunk } from "@reduxjs/toolkit";
import { internalApiEndpoints } from "@/axios/endpoints";
import axios from "axios";
import { GiphyGif } from "./giphyTypes";

export const getGifsThunk = createAsyncThunk(
  "giphy/getGifsThunk",
  async (quantity: number, thunkAPI) => {
    try {
      const resp = await axios.get(internalApiEndpoints.getGifs(quantity));

      console.log("Login thunk resp", resp.data);
      return resp.data as GiphyGif[];
    } catch (error) {
      console.log("Error form Login thunk", error);
      //   const message =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //     return thunkAPI.rejectWithValue(message);

      return thunkAPI.rejectWithValue("Could not get gifs :(");
    }
  }
);
