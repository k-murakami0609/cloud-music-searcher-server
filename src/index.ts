import * as functions from "firebase-functions";
import {
  fetchSearchResultFromYoutube,
  fetchSearchResultFromSpotify
} from "./api/";

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    const q = request.query["q"];
    if (!q) {
      response.status(400).send("検索文字列を入力してください");
      return;
    }

    try {
      const [youtubeResponse, spotifyResponse] = await Promise.all([
        fetchSearchResultFromYoutube(q),
        fetchSearchResultFromSpotify(q)
      ]);

      response.send([...youtubeResponse, ...spotifyResponse]);
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  }
);
