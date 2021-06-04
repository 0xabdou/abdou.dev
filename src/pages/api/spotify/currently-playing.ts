import {NextApiHandler} from "next";
import {
  getCurrentlyPlaying,
  getRecentlyPlayed,
  isSpotifyError
} from "../../../lib/spotify";

const handler: NextApiHandler = async (_, res) => {
  const response = await getCurrentlyPlaying();
  if (isSpotifyError(response)) {
    if (response.status == 204) {
      // No content, user has no Spotify app running
      // Try to get the recently played track instead
      const response = await getRecentlyPlayed();
      if (isSpotifyError(response)) {
        return res.status(response.status).json({error: response.error});
      }
      return res.status(200).json(response);
    }
    return res.status(response.status).json({error: response.error});
  }
  res.status(200).json(response);
};

export default handler;