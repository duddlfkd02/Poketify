"use client";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";

type Props = {
  postId: string;
};

const Comment = ({ postId }: Props) => {
  const [loginId, setLoginId] = useState("");
  const [commentData, setCommentData] = useState<string>("");

  useEffect(() => {
    setLoginId(String(localStorage.getItem("loginId")));
  }, []);

  const addComment = async () => {
    await supabase.from("posts").insert({
      comment: commentData,
      user_id: loginId,
      post_id: postId
    });
  };

  return (
    <>
      <h2>Comment</h2>
      {loginId ? <div>로그인 되어있음</div> : <div>회원에게만 댓글 권한이 있습니다.</div>}
    </>
  );
};
export default Comment;
