export interface GiphyState {
  gifs: {
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    isSuccess: boolean;
    data: GiphyGif[] | null;
  };
}

export interface GiphyGif {
  embed_url: string;
  id: string;
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
}
