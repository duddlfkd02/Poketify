"use client";
import { supabase } from "@/supabase/supabase";
import { CommentType } from "@/types/CommentType";
import { useEffect, useState } from "react";
import { Comment } from "@/components/Comment";
import { UserToken } from "@/types/UserData";

type Props = {
  postId: string;
};

type CommentListType = {
  data: CommentType[] | null;
  count: number;
};

const CommentList = ({ postId }: Props) => {
  const [userData, setUserData] = useState<UserToken | null>(null);
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
    const loginData = localStorage.getItem("sb-fhecalqtqccmzoqyjytv-auth-token");
    setUserData(JSON.parse(loginData as string));

    getCommentList();
  }, []);

  const addComment = async () => {
    if (!commentData) return alert("댓글을 입력해주세요");

    const res = await supabase.from("comment").insert({
      comment: commentData,
      user_id: userData?.user.id,
      post_id: postId,
      user_nickname: userData?.user.identities[0].identity_data.name
    });
    if (res.error) {
      return console.error("error=>", res.error.message);
    }

    setCommentData("");
    await getCommentList();
  };

  return (
    <>
      <h2 className="text-2xl font-bold pb-4 border-b-2 border-solid border-black">Comment({commentList.count})</h2>

      <div className="commentList">
        {commentList.count === 0
          ? undefined
          : commentList.data?.map((comment) => {
              return (
                <div key={comment.id}>
                  <Comment commentData={comment} loginId={userData?.user.id} getCommentList={() => getCommentList()} />
                </div>
              );
            })}
      </div>

      {!!userData ? (
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
        <div className="flex items-center justify-center py-8 bg-[#f4f4f4]">회원에게만 댓글 권한이 있습니다.</div>
      )}
    </>
  );
};
export default CommentList;
