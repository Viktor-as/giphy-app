"use client";

import { selectGifs, selectGifsStates } from "@/store/giphy/giphySlice";
import { getGifsThunk } from "@/store/giphy/giphyThunk";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import GifCard from "./GifCard";
import RefreshBtn from "./RefreshBtn";
import { toggleGifLock } from "@/store/giphy/giphySlice";
import { countLockedGifs } from "../_helpers/countLockedGifs";

export default function GifsGrid() {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useAppSelector(selectGifsStates);
  const gifsArray = useAppSelector(selectGifs);
  console.log("gifsArray", gifsArray);

  // Handlers -----------------------------------
  function handleGifLock(uniqueKey: string) {
    dispatch(toggleGifLock(uniqueKey));
  }

  function fetchNewGifs() {
    if (!gifsArray) return;
    dispatch(getGifsThunk(12 - countLockedGifs(gifsArray)));
  }

  // useEffects -----------------------------------
  useEffect(() => {
    console.log("gifsArray at initial useEffect", gifsArray);
    if (!gifsArray || gifsArray.length === 0) {
      dispatch(getGifsThunk(12));
    } else {
      dispatch(getGifsThunk(12 - countLockedGifs(gifsArray)));
    }
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
            key={`${gifData.uniqueKey}-${Date.now()}`}
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
