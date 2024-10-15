"use client";
import { supabase } from "@/supabase/supabase";
import { CommentType } from "@/types/CommentType";
import { useState } from "react";

type Props = {
  commentData: CommentType;
  loginId: string | undefined;
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
    <div className="relative flex flex-col gap-2 border border-solid border-[#e9e9e9] rounded p-4 pr-20 mt-4 min-h-24">
      <div className="flex items-center gap-2 text-sm">
        <span className="writer">{commentData.user_nickname}</span>
        <span className="text-[#888888]">{commentData.created_at.slice(0, 10)}</span>
      </div>
      <input
        className="outline-none flex-1 rounded"
        type="text"
        onChange={(e) => setEditComment(e.target.value)}
        value={editComment!}
        readOnly={readOnly}
        style={{ border: readOnly ? "none" : "1px solid #0079FF" }}
      />

      {commentData.user_id === loginId ? (
        <div className="absolute top-1/2 right-2 flex flex-col gap-1 -translate-y-1/2">
          <button
            className="blue_button button text-sm py-2 leading-none"
            onClick={() => (readOnly ? changeReadOnly() : updateComment())}
          >
            {readOnly ? "수정" : "완료"}
          </button>
          <button className="button text-sm py-2 leading-none" onClick={() => deleteComment()}>
            삭제
          </button>
        </div>
      ) : undefined}
    </div>
  );
};
