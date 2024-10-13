export const getSpotifyToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_API_KEY as string,
    client_secret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET_KEY as string
  });

  // const params = {
  //   grant_type: "client_credentials",
  //   client_id: process.env.NEXT_PUBLIC_SPOTIFY_API_KEY,
  //   client_secret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET_KEY
  // };

  // const clientID = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY;
  // console.log("Id=>", clientID);

  // const params = {
  //   grant_type: "client_credentials",
  //   client_id: "151dd2a7a0c44d339b56e55b1acaf439",
  //   client_secret: "5d5e0b455f224c9c918c6199ad95b367"
  // };

  console.log("params=>", JSON.stringify(params));

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // body: params.toString()
    body: new URLSearchParams(params)
  });

  console.log("res=>", res);

  const { access_token: token } = await res.json();
  return token;
};

export const getSpotifyPlaylistItems = async (token: string) => {
  const res = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DXe5W6diBL5N4/tracks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};
