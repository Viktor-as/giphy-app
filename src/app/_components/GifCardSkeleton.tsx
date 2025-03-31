import React from "react";

function GifCardSkeleton() {
  return (
    <div className="w-[23rem]">
      <div className="w-[23rem] h-[16.5rem] rounded-[0.6rem] animate-pulse bg-gray-200" />
      <div className="h-[1.6rem] my-[0.4rem] rounded bg-gray-200 animate-pulse w-[80%]" />
      <div className="h-[2rem] rounded bg-gray-200 animate-pulse w-[90%]" />
    </div>
  );
}

export default React.memo(GifCardSkeleton);
