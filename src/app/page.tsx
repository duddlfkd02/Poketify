import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white font-cafe24meongi">
      <div className="text-center">
        <h1 className="text-9xl font-medium text-custom-blue mb-4">Poketify</h1>
        <Link href="/main">
          <button className="px-10 py-2 bg-custom-skyblue text-white rounded-full hover:bg-custom-blue transition duration-300">
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
