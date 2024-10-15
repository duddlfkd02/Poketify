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

    router.replace(`/community/list/1`);
  };

  return (
    <div>
      <div className="headerArea">
        <h2>{postData.title}</h2>
        <div className="writer">{postData.user_nickname}</div>
        <div className="date">{postData.created_at?.slice(0, 10)}</div>
      </div>

      <div className="content">
        <div className="playlist">{children ? children : "플레이 리스트 정보가 없습니다."}</div>

        {postData.content}

        {loginId?.user.id === postData.user_id ? (
          <div>
            <Link href={`/community/edit/${postData.id}`}>수정</Link>
            <button onClick={() => deletePost()}>삭제</button>
          </div>
        ) : null}
      </div>

      <div className="comment">
        <CommentList postId={postData.id!} />
      </div>
    </div>
  );
};
export default DetailLayout;
