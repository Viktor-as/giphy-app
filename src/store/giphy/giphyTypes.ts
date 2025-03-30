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
  };
  isLocked?: boolean;
  isLoading?: boolean;
}
