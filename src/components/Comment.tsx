"use client";
import { supabase } from "@/supabase/supabase";
import { CommentType } from "@/types/CommentType";
import { useState } from "react";

type Props = {
  commentData: CommentType;
  loginId: string | null;
  getCommentList: () => Promise<void>;
};

export const Comment = ({ commentData, loginId, getCommentList }: Props) => {
  const [editComment, setEditComment] = useState<string | null>(commentData.comment);
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const changeReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const updateComment = async () => {
    if (!editComment) return alert("댓글을 입력해주세요");

    await supabase.from("comment").update({ comment: editComment }).eq("id", commentData.id).select();
    setReadOnly(!readOnly);
  };

  const deleteComment = async () => {
    const { error } = await supabase.from("comment").delete().eq("id", commentData.id);
    if (error) {
      console.error(error);
    }
    alert("삭제되었습니다.");
    await getCommentList();
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setEditComment(e.target.value)}
        value={editComment!}
        readOnly={readOnly}
        style={{ border: readOnly ? "none" : "1px solid #121212" }}
      />

      {commentData.user_id === loginId ? (
        <div>
          <button onClick={() => (readOnly ? changeReadOnly() : updateComment())}>{readOnly ? "수정" : "완료"}</button>
          <button onClick={() => deleteComment()}>삭제</button>
        </div>
      ) : undefined}
    </>
  );
};
