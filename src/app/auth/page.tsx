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

  // 로그인 핸들러
  const handleSpotifyLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: "https://poketify.vercel.app/auth/callback",
        scopes:
          "user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming"
      }
    });

    if (error) {
      console.error("로그인 중 오류: ", error.message);
      setError(error.message);
    }
  };

  // 로그인 완료
  const handleLoginSuccess = async (session: Session) => {
    const { user } = session;

    const profileData = {
      id: user.id,
      display_name: user.user_metadata.full_name || "",
      profile_image: user.user_metadata.avatar_url || ""
    };

    const { data: existingProfile, error: fetchError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("기존 프로필을 가져오는 중에 오류가 발생 했습니다:", fetchError);
      return;
    }

    // 기존 프로필이 업데이트 되었으면 이미지를 바로 리턴
    if (existingProfile?.profile_image) {
      return;
    }

    if (!!existingProfile) {
      const { error: updateError } = await supabase.from("profile").update(profileData).eq("id", user.id);

      if (updateError) {
        console.error("기존 프로필을 업데이트 하는 중에 오류가 발생했습니다.:", updateError);
      } else {
        console.log("프로필이 업데이트 되었습니다.:", profileData);
      }
    } else {
      const { error: insertError } = await supabase.from("profile").insert(profileData);

      if (insertError) {
        console.error("프로필을 삽입하는 중에 오류가 발생했습니다:", insertError);
      } else {
        console.log("프로필이 삽입되었습니다.:", profileData);
      }
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error("세션을 가져오는 중에 오류가 발생했습니다.:", error.message);
        setError(error.message);
      } else {
        console.log("Fetched session:", session);

        setSession(session);
        localStorage.setItem("loginId", String(session?.user.id));

        if (session) {
          await handleLoginSuccess(session);
          router.push("/main");
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
    <div className="flex justify-center wrap mx-auto my-auto">
      <div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {!session && (
          <div className="flex flex-col items-center">
            <button
              onClick={handleSpotifyLogin}
              className="bg-custom-skyblue text-white py-3 px-28 rounded-full hover:bg-custom-blue transition duration-200 font-bold text-lg w-full text-center"
            >
              Spotify Login
            </button>
            <div>
              <p className="text-custom-blue text-xs mt-2 text-center">
                * Poketify를 이용하려면 Spotify 계정이 필요합니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
