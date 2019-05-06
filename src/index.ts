import * as functions from "firebase-functions";
import {
  fetchSearchResultFromYoutube,
  fetchSearchResultFromSpotify
} from "./api/";

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    try {
      const [youtubeResponse, spotifyResponse] = await Promise.all([
        fetchSearchResultFromYoutube(),
        fetchSearchResultFromSpotify()
      ]);

      response.send([...youtubeResponse, ...spotifyResponse]);
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  }
);
