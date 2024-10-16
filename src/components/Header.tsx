import { useEffect, useState } from "react";
import { supabase } from "@/app/api/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import SearchBar from "./SearchBar";

const Header = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error("세션을 가져오는 중에 오류가 발생했습니다.:", error.message);
      } else {
        setSession(session);
      }
    };

    // 세션 변경 사항 수신
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 오류 발생:", error.message);
    } else {
      setSession(null);
      const logoutWindow = window.open("https://accounts.spotify.com/logout", "_blank", "width=500,height=600");
      setTimeout(() => {
        logoutWindow?.close(); // Spotify 로그아웃을 하는 것을 새창으로 보여주기
        router.push("/main");
      }, 2000);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full p-4 shadow-md bg-white z-50">
      <div className="relative   w-[98%] mx-auto flex flex-col gap-4">
        <div className="flex justify-between md:justify-end items-start">
          <Link
            href="/main"
            className="md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 text-4xl font-medium font-cafe24meongi text-custom-blue"
          >
            poketify
          </Link>

          <SearchBar />
        </div>

        <nav className="ml-auto">
          <ul className="flex space-x-6">
            <li>
              <Link href={"/community/list"} className="nexon hover:text-custom-blue">
                Community
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/playlist" className="nexon hover:text-custom-blue">
                    Playlist
                  </Link>
                </li>
                <li>
                  <Link href="/mypage" className="nexon hover:text-custom-blue">
                    My Page
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nexon hover:text-custom-blue">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth" className="nexon hover:text-custom-blue">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
