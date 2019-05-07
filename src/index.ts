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
      const results = await Promise.all([
        fetchSearchResultFromYoutube(q).catch(error => {
          console.error(error);
          return error;
        }),
        fetchSearchResultFromSpotify(q).catch(error => {
          console.error(error);
          return error;
        })
      ]);

      // どれか一つでもAPIが成功していたら、その結果を返却する。
      const validResults = results.filter(result => !(result instanceof Error));
      if (validResults.length <= 0) {
        response.status(500).send("all api is error");
        return;
      }

      const result = [].concat.apply([], validResults);
      response.send(result);
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  }
);
