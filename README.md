## About Giphy app

This is the Giphy app that generates random Gifs for you.  
You can lock the Gifs by pressing on them and locked ones will not get refreshed.  
You can refresh the unlocked gifs by pressing the button or SPACEBAR.  
Your locked Gifs will be saved to local storage, so they persist for your next visit.

## Launch instructions

This repository includes a .env file with 2 free Giphy API keys.  
There is a rate limit of 100 API calls per hour.  
So if you run out of the API calls, you can change the Key to another one.

First step is to install dependencies:

```bash
yarn install
```

To run the development server:

```bash
yarn dev
```

To build and run the production server:

```bash
yarn build
yarn start
```

Also to build the production server you can use Docker:

```bash
docker compose up -d
```

Or you can visit this site to check the app:
[giphy.viktoras.site](https://giphy.viktoras.site)
