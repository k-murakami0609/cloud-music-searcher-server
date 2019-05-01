import * as functions from "firebase-functions";
import { fetchYoutube } from "./api/";

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    try {
      const res = await fetchYoutube();
      response.send(res.data);
    } catch (e) {
      console.log(e);
    }
  }
);
