import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4">Poketify</h1>
        <Link href="/main">
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
