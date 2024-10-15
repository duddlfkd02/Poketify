"use client";
import { supabase } from "@/supabase/supabase";
import { CommentType } from "@/types/CommentType";
import { useEffect, useState } from "react";
import { Comment } from "@/components/Comment";

type Props = {
  postId: string;
};

type CommentListType = {
  data: CommentType[] | null;
  count: number;
};

const CommentList = ({ postId }: Props) => {
  const [loginId, setLoginId] = useState<string | null>(null);
  const [commentData, setCommentData] = useState<string | null>("");
  const [commentList, setCommentList] = useState<CommentListType>({ data: null, count: 0 });

  const getCommentList = async () => {
    const { data, count } = await supabase.from("comment").select("*", { count: "exact" }).eq("post_id", postId);

    setCommentList({
      data: data!,
      count: count!
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginUserId = localStorage.getItem("loginId");
      if (loginUserId) {
        setLoginId(loginUserId);
      }
    }
    getCommentList();
  }, []);

  const addComment = async () => {
    if (!commentData) return alert("댓글을 입력해주세요");

    const res = await supabase.from("comment").insert({
      comment: commentData,
      user_id: loginId,
      post_id: postId
    });
    if (res.error) {
      return console.error("error=>", res.error.message);
    }

    setCommentData("");
    await getCommentList();
  };

  return (
    <>
      <h2>Comment({commentList.count})</h2>

      <div className="commentList">
        {commentList.count === 0
          ? "댓글이 없습니다."
          : commentList.data?.map((comment) => {
              return (
                <div key={comment.id}>
                  <Comment commentData={comment} loginId={loginId} getCommentList={() => getCommentList()} />
                </div>
              );
            })}
      </div>

      {!!loginId ? (
        <div>
          <input
            type="text"
            name="comment"
            id="comment"
            value={commentData!}
            onChange={(e) => {
              setCommentData(e.target.value);
            }}
            className="outline-none"
          />
          <button onClick={() => addComment()}>등록</button>
        </div>
      ) : (
        <div>회원에게만 댓글 권한이 있습니다.</div>
      )}
    </>
  );
};
export default CommentList;
