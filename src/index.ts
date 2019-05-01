import * as functions from "firebase-functions";
import { fetchSpotify } from "./api/";

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    try {
      // const res = await fetchYoutube();
      // response.send(res.data);
      const res = await fetchSpotify();
      response.send(res);
    } catch (e) {
      console.log(e);
    }
  }
);
