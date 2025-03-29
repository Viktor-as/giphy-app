export const internalApiEndpoints = {
  getGifs: (quantity: number): string => `/api/get-gifs?quantity=${quantity}`,
};

export const externalApiEndpoints = {
  getGifs: (apiKey: string): string =>
    `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`,
};
