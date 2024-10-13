"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Spotify 로그인
const loginSpotify = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "spotify"
  });

  if (error) {
    console.error("Error during login:", error);
  } else {
    console.log("OAuth Data:", data);
  }
};

// Spotify 로그아웃
const logoutSpotify = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error during logout:", error);
  } else {
    console.log("Success logout");
  }
};

const LoginTestPage = () => {
  return (
    <>
      <h1>Spotify 로그인 테스트</h1>
      <button onClick={loginSpotify}>Spotify 로그인</button>
      <button onClick={logoutSpotify}>Spotify 로그아웃</button>
    </>
  );
};

export default LoginTestPage;
