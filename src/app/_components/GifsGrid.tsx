"use client";

import { addLoadingState, selectGifs, selectGifsStates } from "@/store/giphy/giphySlice";
import { getGifsThunk } from "@/store/giphy/giphyThunk";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect, useCallback, useMemo, useState } from "react";
import GifCard from "./GifCard";
import RefreshBtn from "./RefreshBtn";
import { toggleGifLock } from "@/store/giphy/giphySlice";
import { countLockedGifs } from "../_helpers/countLockedGifs";
import GifCardSkeleton from "./GifCardSkeleton";

export default function GifsGrid() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, message } = useAppSelector(selectGifsStates);
  const gifsArray = useAppSelector(selectGifs);
  const [localErrMessage, setLocalErrMessage] = useState("");

  const skeletonElements = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => <GifCardSkeleton key={`skeleton-${index}`} />),
    []
  );

  // Handlers -----------------------------------
  const handleGifLock = useCallback(
    (uniqueKey: string) => {
      dispatch(toggleGifLock(uniqueKey));
    },
    [dispatch]
  );

  const fetchNewGifs = useCallback(() => {
    if (isLoading) return;
    setLocalErrMessage("");
    const gifsToGet = 12 - countLockedGifs(gifsArray || []);
    if (gifsToGet < 1) {
      setLocalErrMessage("You have locked all the gifs!");
      return;
    }
    dispatch(addLoadingState());
    dispatch(getGifsThunk(gifsToGet));
  }, [dispatch, gifsArray, isLoading]);

  // useEffects -----------------------------------
  // Fetch initial gifs on mount
  useEffect(() => {
    fetchNewGifs();
  }, []);

  // Add Spacebar listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isLoading) {
        e.preventDefault();
        fetchNewGifs();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gifsArray, isLoading, fetchNewGifs]);

  return (
    <section className="flex flex-col w-full" aria-label="Random GIFs list">
      <div className="grid [grid-template-columns:repeat(auto-fit,23rem)] justify-center gap-[2.4rem] py-[2.4rem] px-[1.2rem] w-full">
        {!gifsArray || gifsArray.length === 0
          ? skeletonElements
          : gifsArray.map((gifData) => (
              <GifCard key={gifData.uniqueKey} gifData={gifData} handleGifLock={handleGifLock} />
            ))}
      </div>
      <div className="center-col mt-[3.2rem] mb-[1.6rem]">
        <RefreshBtn
          text="Hit here to refresh gifs or press space"
          isLoading={isLoading}
          onClick={fetchNewGifs}
        />
        {(isError || localErrMessage) && (
          <div className="mt-6">
            <p className="text-[1.4rem] text-red-400">{isError ? message : localErrMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
