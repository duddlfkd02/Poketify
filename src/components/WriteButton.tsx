"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WriteButton = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const getToken = localStorage.getItem("sb-fhecalqtqccmzoqyjytv-auth-token");
    if (!getToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <>
      {!isLogin ? (
        <Link className="button blue_button" href={"/community/write"}>
          글쓰기
        </Link>
      ) : null}
    </>
  );
};
export default WriteButton;
