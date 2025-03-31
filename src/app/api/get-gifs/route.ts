import { type NextRequest } from "next/server";
import axios from "axios";
import { externalApiEndpoints } from "@/axios/endpoints";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quantity = Number(searchParams.get("quantity"));

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return Response.json({ error: "Invalid gif quantity specified" }, { status: 400 });
    }

    const giphyApiKey = process.env.GIPHY_API_KEY;

    if (!giphyApiKey) {
      return Response.json({ error: "GIPHY_API_KEY is not defined" }, { status: 500 });
    }

    const requests = Array.from({ length: quantity }, () =>
      axios.get(externalApiEndpoints.getGifs(giphyApiKey))
    );

    const responses = await Promise.all(requests);
    const gifs = responses.map((res) => res.data.data);

    return Response.json(gifs);
  } catch {
    return Response.json(
      { error: "Something went wrong, the app might have reached free Giphy limit" },
      { status: 500 }
    );
  }
}
