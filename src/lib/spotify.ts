export type Artist = {
  name: string,
  url: string,
}

export type Track = {
  title: string,
  url: string
  imageURL: string,
  artists: Artist[],
  isPlaying: boolean,
  date: number,
}

export const parseTrack = (json: any): Track => {
  return {
    title: json.item.name,
    url: json.item.external_urls.spotify,
    imageURL: json.item.album.images[1].url,
    artists: (json.item.artists as any[]).map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify
    })),
    isPlaying: json.is_playing,
    date: json.timestamp
  };
};