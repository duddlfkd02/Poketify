"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FormType } from "@/types/FormType";
import browserClient from "@/supabase/client";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const initialData = {
  title: "제목",
  playlist_id: "37i9dQZF1DXe1kZnloaHv1",
  content: "컨텐트",
  user_nickname: "text"
};

const Form = () => {
  const [formData, setFormData] = useState<FormType>(initialData);

  const loginTest = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/community/write`
      }
    });
  };

  const onAddClick = async () => {
    console.log(formData);
    await supabase.from("posts").insert(formData);
  };

  return (
    <>
      <button onClick={() => onAddClick()}>POST TEST</button>
      <form>
        <div>
          <label htmlFor="title">제목</label>
          <input id="title" name="title" type="text" />
        </div>

        <div>
          <label htmlFor="playlist">플레이리스트 아이디</label>
          <input id="playlist" name="playlist" type="text" />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <input id="content" name="content" type="text" />
        </div>
      </form>
    </>
  );
};
export default Form;
