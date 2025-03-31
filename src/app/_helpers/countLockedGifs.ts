import { GiphyGif } from "@/store/giphy/giphyTypes";

export function countLockedGifs(gifsArray: GiphyGif[]): number {
  if (gifsArray.length === 0) return 0;
  return gifsArray.reduce((count, gif) => {
    return gif.isLocked === true ? count + 1 : count;
  }, 0);
}
