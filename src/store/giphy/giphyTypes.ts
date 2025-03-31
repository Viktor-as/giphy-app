export interface GiphyState {
  gifsStates: {
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    isSuccess: boolean;
  };
  gifsArray: GiphyGif[] | null;
}

export interface GiphyGif {
  embed_url: string;
  id: string;
  uniqueKey: string;
  title: string;
  alt_text: string;
  import_datetime: string;
  images: {
    downsized: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    original_mp4: {
      mp4: string;
      width: string;
      height: string;
      mp4_size: string;
    };
  };
  isLocked?: boolean;
  isLoading?: boolean;
}
