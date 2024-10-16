"use client";
import CommentList from "@/components/CommentList";
import { FormType } from "@/types/FormType";
import { UserToken } from "@/types/UserData";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Props = {
  postData: FormType;
  children?: JSX.Element;
};

const DetailLayout = ({ postData, children }: Props) => {
  const [loginId, setLoginId] = useState<UserToken | null>();
  const router = useRouter();

  useEffect(() => {
    const loginData = localStorage.getItem("sb-fhecalqtqccmzoqyjytv-auth-token");
    setLoginId(JSON.parse(loginData as string));
  }, []);

  const deletePost = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", postData.id);
    if (error) {
      console.error(error);
    }
    alert("삭제되었습니다.");

    router.replace(`/community/list`);
  };

  return (
    <div className="wrap">
      <div className="headerArea flex flex-col items-center gap-4 pb-6 border-b-2 border-solid border-black">
        <h2 className="text-3xl font-bold">{postData.title}</h2>
        <div className="flex justify-center gap-3">
          <span className="writer">{postData.user_nickname}</span>
          <span className="date text-[#888888]">{postData.created_at?.slice(0, 10)}</span>
        </div>
      </div>

      <div className="content border-b border-solid border-custom-blue pb-6">
        <div className="playlist">
          {children ? (
            children
          ) : (
            <div className="flex items-center justify-center py-8 bg-[#f4f4f4]">플레이 리스트 정보가 없습니다.</div>
          )}
        </div>

        <div className="mt-6">{postData.content}</div>

        {loginId?.user.id === postData.user_id ? (
          <div className="flex gap-2 justify-end mt-6">
            <Link className="button blue_button" href={`/community/edit/${postData.id}`}>
              수정
            </Link>
            <button className="button" onClick={() => deletePost()}>
              삭제
            </button>
          </div>
        ) : null}
      </div>

      <div className="comment mt-16">
        <CommentList postId={postData.id!} />
      </div>
    </div>
  );
};
export default DetailLayout;
