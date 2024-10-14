// export const getAccessToken = async () => {
//   const params = new URLSearchParams({
//     grant_type: "client_credentials",
//     client_id: SPOTIFY_CLIENT_ID,
//     client_secret: SPOTIFY_CLIENT_SECRET
//   });

import { supabase } from "@/app/api/supabaseClient";

//   const res = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: params.toString()
//   });

//   const { access_token } = await res.json();
//   return access_token;
// };

export const getPrivateAccessToken = async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Error fetching session: " + error.message);
  }

  const accessToken = session?.provider_token;

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  return accessToken;
};
