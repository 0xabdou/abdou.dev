export type SpotifyError = {
  __typename: "SpotifyError",
  status: number,
  error: string,
}

export const getSpotifyError = async (response: Response): Promise<SpotifyError> => {
  const error: SpotifyError = {
    __typename: "SpotifyError",
    status: response.status,
    error: await response.text(),
  };
  console.log("ERROR: ", error);
  return error;
};

export const isSpotifyError = (object: any): object is SpotifyError => {
  return object.__typename == "SpotifyError";
};
