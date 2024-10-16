import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 shadow-md bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/main" className="text-2xl font-medium font-cafe24meongi text-custom-blue">
            poketify
          </Link>
        </div>

        <div>
          <SearchBar />
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/playlist" className="hover:text-custom-blue">
                Playlist
              </Link>
            </li>
            <li>
              <Link href={"/community/list"} className="hover:text-custom-blue">
                Community
              </Link>
            </li>
            <li>
              <Link href="/auth" className="hover:text-custom-blue">
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
