"use client";

import { selectGifs } from "@/store/giphy/giphySlice";
import { getGifsThunk } from "@/store/giphy/giphyThunk";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import Image from "next/image";

export default function GifsGrid() {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message, data: gifsData } = useAppSelector(selectGifs);
  console.log("gifsData", gifsData);
  // useEffects -----------------------------------
  useEffect(() => {
    dispatch(getGifsThunk(5));
  }, []);

  if (!gifsData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {gifsData.map((gif) => (
        <Image
          src={gif.images.downsized.url}
          alt={gif.title || "Giphy GIF"}
          width={Number(gif.images.downsized.width)}
          height={Number(gif.images.downsized.height)}
          className="rounded-xl shadow-lg"
          key={gif.id}
        />
      ))}
    </div>
  );
}
