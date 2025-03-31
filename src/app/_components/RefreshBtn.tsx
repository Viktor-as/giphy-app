"use client";
import RefreshIcon from "@/media/icons/BiRefresh.svg";
import React from "react";

interface RefreshBtnProps {
  text: string;
  isLoading: boolean;
  onClick: () => void;
}

function RefreshBtn({ text, isLoading, onClick }: RefreshBtnProps) {
  return (
    <button
      className={`p-[1.4rem] bg-blueBtnBg center gap-[1.4rem] text-[1.4rem] rounded-[6px] transition-opacity duration-300 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } cursor-pointer`}
      disabled={isLoading}
      onClick={onClick}
    >
      <span className={isLoading ? "animate-spin" : ""}>
        <RefreshIcon />
      </span>
      {text}
    </button>
  );
}

export default React.memo(RefreshBtn);
