import * as functions from "firebase-functions";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: functions.config().apikey.youtube
});

// TODO: わかりやすい関数名にする
const fetchYoutube = async () => {
  const res = await youtube.search.list({
    part: "id,snippet",
    q: "花火",
    regionCode: "JP",
    type: "video"
  });

  return res;
};

export { fetchYoutube };
