import * as functions from "firebase-functions";
import * as SpotifyWebApi from "spotify-web-api-node";
import { SpotifyItem } from "../types/spotify-item";
import ApiTypes from "../const/ApiTypes";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(functions.config().apikey.spotify);

const convertSpotifyItemToCommonItem = (items: SpotifyItem[]) => {
  return items.map(item => {
    return {
      url: item.external_urls ? item.external_urls.spotify : "",
      title: item.name,
      publishedAt: item.release_date,
      thumbnails: item.images.length > 0 ? item.images[0].url : "",
      artist: item.artists.length > 0 ? item.artists[0].name : "",
      type: ApiTypes.SPOTIFY
    };
  });
};

const fetchSearchResultFromSpotify = async (q: string) => {
  const res = await spotifyApi.search(q, ["album"], { market: "JP" });
  const albums = res.body.albums;

  return convertSpotifyItemToCommonItem(albums ? albums.items : []);
};

export { fetchSearchResultFromSpotify };
