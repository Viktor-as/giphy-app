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

  function fetchNewGifs() {
    if (!gifsArray) return;
    const lockedCount = gifsArray.reduce((count, gif) => {
      return gif.isLocked === true ? count + 1 : count;
    }, 0);
    dispatch(getGifsThunk(12 - lockedCount));
  }

  // useEffects -----------------------------------
  useEffect(() => {
    dispatch(getGifsThunk(12));
  }, []);

  // Add Spacebar listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && !isLoading) {
        e.preventDefault();
        fetchNewGifs();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gifsArray, isLoading]);

  if (!gifsArray) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full ">
      <div className="grid [grid-template-columns:repeat(auto-fit,23rem)] justify-center gap-[2.4rem] py-[2.4rem] px-[1.2rem] w-full">
        {gifsArray.map((gifData) => (
          <GifCard
            key={`${gifData.id}-${Date.now()}`}
            gifData={gifData}
            handleGifLock={handleGifLock}
          />
        ))}
      </div>
      <div className="flex justify-center mt-[3.2rem] mb-[1.6rem]">
        <RefreshBtn
          text="Hit here to refresh gifs or press space"
          isLoading={isLoading}
          onClick={fetchNewGifs}
        />
      </div>
    </div>
  );
}
