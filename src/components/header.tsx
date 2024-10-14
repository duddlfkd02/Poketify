import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 shadow-md bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-2xl font-bold">
            poketify
          </Link>
        </div>

        <div>
          <SearchBar />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/playlist" className="hover:text-gray-300">
                Playlist
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:text-gray-300">
                Community
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
