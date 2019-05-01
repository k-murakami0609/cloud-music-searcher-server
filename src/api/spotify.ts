import * as functions from "firebase-functions";
import * as SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(functions.config().apikey.spotify);

// TODO: わかりやすい関数名にする
const fetchSpotify = async () => {
  const res = await spotifyApi.search("花火", ["album"], { market: "JP" });

  return res;
};

export { fetchSpotify };
