export type Artist = {
  name: string,
  url: string,
}

export type Album = {
  title: string,
  url: string,
  imageURL: string,
}

export type Track = {
  id: string,
  title: string,
  url: string
  album: Album,
  artists: Artist[],
  isPlaying: boolean,
  date: number,
}

export type Playlist = {
  url: string,
  name: string,
  tracks: Track[]
}
