"use client";
import { GiphyGif } from "@/store/giphy/giphyTypes";
import { formatDateDashes } from "../_helpers/formatDateDashes";
import LockIcon from "@/media/icons/MdOutlineLockOpen.svg";
import LockedLockIcon from "@/media/icons/LockedLock.svg";
import GifCardSkeleton from "./GifCardSkeleton";
import React from "react";

interface GifCardProps {
  gifData: GiphyGif;
  handleGifLock: (uniqueKey: string) => void;
}

function GifCard({ gifData, handleGifLock }: GifCardProps) {
  if (gifData.isLoading) {
    return <GifCardSkeleton />;
  }

  return (
    <div className="w-[23rem]">
      <div
        onClick={() => handleGifLock(gifData.uniqueKey)}
        className="bg-white w-[23rem] h-[16.5rem] relative rounded-[0.6rem] border-[2px] border-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="rounded-[0.6rem] w-full h-full object-cover"
        >
          <source src={gifData.images.original_mp4.mp4} type="video/mp4" />
        </video>
        {gifData.isLocked ? (
          <div className="center w-[2.6rem] h-[2.6rem] bg-black absolute top-[10px] right-[10px] rounded-[0.4rem]">
            <LockedLockIcon className="w-[1.2rem]" />
          </div>
        ) : (
          <div className="center w-[2.6rem] h-[2.6rem] bg-black/48 hover:bg-black/100 transition duration-300 absolute top-[10px] right-[10px] rounded-[0.4rem]">
            <LockIcon />
          </div>
        )}
      </div>
      <p className="text-[1.2rem]  pt-[0.2rem] pb-[0.4rem]">
        {formatDateDashes(gifData.import_datetime)}
      </p>
      <p className="text-[1.6rem] leading-[1.2] font-bold">{gifData.title ?? "No Title"}</p>
    </div>
  );
}

export default React.memo(GifCard);
