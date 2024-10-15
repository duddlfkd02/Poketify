"use client";

import { supabase } from "@/app/api/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

export default function Auth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Login handler
  const handleSpotifyLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        scopes: "user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private"
      }
    });

    if (error) {
      console.error("Error during login: ", error.message);
      setError(error.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Supabase 로그아웃

    if (error) {
      console.error("Error during logout:", error.message);
    } else {
      setSession(null); // 세션 초기화

      // Spotify 세션 강제로 만료시킴 (작은 새 창을 열었다가 자동으로 닫음)
      const logoutWindow = window.open("https://accounts.spotify.com/logout", "_blank", "width=500,height=600");

      setTimeout(() => {
        logoutWindow?.close(); // 로그아웃 창을 1초 후 닫음
        router.push("/auth"); // auth 페이지로 리다이렉트
      }, 2000);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setError(error.message);
      } else {
        console.log("Fetched session:", session);

        setSession(session);
        localStorage.setItem("loginId", String(session?.user.id));

        if (session) {
          router.push("/auth");
        }
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-52">
      <h1>로그인 페이지</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!session ? (
        <button onClick={handleSpotifyLogin}>Login with Spotify</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}
