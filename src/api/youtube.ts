/* eslint-disable @typescript-eslint/camelcase */

import * as functions from "firebase-functions";
import { google, youtube_v3 } from "googleapis";
import ApiTypes from "../const/ApiTypes";
import * as moment from "moment";

const youtube = google.youtube({
  version: "v3",
  auth: functions.config().apikey.youtube
});

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
    const publishedAt =
      snippet &&
      snippet.publishedAt &&
      moment(snippet.publishedAt).format("YYYY-MM-DD");

    return {
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: (snippet && snippet.title) || "",
      publishedAt: publishedAt || "",
      thumbnails: url || "",
      artist: (snippet && snippet.channelTitle) || "",
      type: ApiTypes.YOUTUBE
    };
  });
};

const fetchSearchResultFromYoutube = async (q: string) => {
  const res = await youtube.search.list({
    part: "id,snippet",
    q: q,
    regionCode: "JP",
    type: "video"
  });

  return convertYotubeItemToCommonItem(res.data.items || []);
};

export { fetchSearchResultFromYoutube };
