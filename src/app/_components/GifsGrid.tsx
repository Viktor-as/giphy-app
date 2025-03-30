"use client";

import { selectGifs } from "@/store/giphy/giphySlice";
import { getGifsThunk } from "@/store/giphy/giphyThunk";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import GifCard from "./GifCard";
import RefreshBtn from "./RefreshBtn";
import { toggleGifLock } from "@/store/giphy/giphySlice";

export default function GifsGrid() {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message, data: gifsArray } = useAppSelector(selectGifs);
  console.log("gifsArray", gifsArray);

  // Handlers -----------------------------------
  function handleGifLock(gifId: string) {
    dispatch(toggleGifLock(gifId));
  }

  // useEffects -----------------------------------
  useEffect(() => {
    dispatch(getGifsThunk(12));
  }, []);

  if (!gifsArray) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full ">
      <div className="grid [grid-template-columns:repeat(auto-fit,23rem)] justify-center gap-[2.4rem] py-[2.4rem] px-[1.2rem] w-full">
        {gifsArray.map((gifData) => (
          <GifCard key={gifData.id} gifData={gifData} handleGifLock={handleGifLock} />
        ))}
      </div>
      <div className="flex justify-center mt-[3.2rem] mb-[1.6rem]">
        <RefreshBtn
          text="Hit here to refresh gifs or press space"
          isLoading={false}
          onClick={() => {
            console.log("btn clicked");
          }}
        />
      </div>
    </div>
  );
}
