import { GiphyGif } from "@/store/giphy/giphyTypes";

export function countLockedGifs(gifsArray: GiphyGif[]): number {
  return gifsArray.reduce((count, gif) => {
    return gif.isLocked === true ? count + 1 : count;
  }, 0);
}
