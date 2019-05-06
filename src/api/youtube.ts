/* eslint-disable @typescript-eslint/camelcase */

import * as functions from "firebase-functions";
import { google, youtube_v3 } from "googleapis";
import ApiTypes from "../const/ApiTypes";

const youtube = google.youtube({
  version: "v3",
  auth: functions.config().apikey.youtube
});

// TODO: わかりやすい関数名にする
const convertYotubeItemToCommonItem = (
  items: youtube_v3.Schema$SearchResult[]
) => {
  return items.map(item => {
    const snippet = item.snippet;
    const url =
      snippet &&
      snippet.thumbnails &&
      snippet.thumbnails.default &&
      snippet.thumbnails.default.url;
    const videoId = (item.id && item.id.videoId) || "";

    return {
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: (snippet && snippet.title) || "",
      publishedAt: (snippet && snippet.publishedAt) || "",
      thumbnails: url || "",
      type: ApiTypes.YOUTUBE
    };
  });
};

const fetchSearchResultFromYoutube = async () => {
  const res = await youtube.search.list({
    part: "id,snippet",
    q: "花火",
    regionCode: "JP",
    type: "video"
  });

  return convertYotubeItemToCommonItem(res.data.items || []);
};

export { fetchSearchResultFromYoutube };
