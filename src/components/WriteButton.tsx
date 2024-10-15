"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WriteButton = () => {
  const [isLogin, setIsLogin] = useState<string>("undefined");

  useEffect(() => {
    setIsLogin(String(localStorage.getItem("loginId")));
  }, []);
  return (
    <>
      {isLogin !== "undefined" ? (
        <Link className="button" href={"/community/write"}>
          글쓰기
        </Link>
      ) : null}
    </>
  );
};
export default WriteButton;
