"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FormType } from "@/types/FormType";
import browserClient from "@/supabase/client";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const initialData = {
  title: "",
  playlist_id: "",
  content: "",
  user_nickname: ""
};

type Props = {
  params?: string;
  isEdit?: boolean;
};

const Form = ({ params, isEdit }: Props) => {
  const [formData, setFormData] = useState<FormType>(initialData);

  const fetchData = async () => {
    const { data } = await browserClient.from("posts").select().eq("id", params);

    setFormData(data ? data[0] : initialData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const loginTest = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `http://localhost:3000/community/write`
      }
    });
  };

  const writeHandler = async () => {
    const data = await supabase.from("posts").insert(formData);
    console.log("abc", data);
  };

  const editHandler = async () => {
    await supabase
      .from("posts")
      .update({ ...formData })
      .eq("id", params)
      .select();
  };

  const onSubmit = () => {
    if (isEdit) {
      editHandler();
    } else {
      writeHandler();
    }
  };

  return (
    <>
      <button onClick={() => loginTest()}>TEST LOGIN</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label htmlFor="title">제목</label>
          <input id="title" name="title" type="text" onChange={(e) => changeInput(e)} value={formData?.title} />
        </div>

        <div>
          <label htmlFor="playlist_id">플레이리스트 아이디</label>
          <input
            id="playlist_id"
            name="playlist_id"
            type="text"
            onChange={(e) => changeInput(e)}
            value={formData?.playlist_id}
          />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <input id="content" name="content" type="text" onChange={(e) => changeInput(e)} value={formData?.content} />
        </div>

        <button type="submit">완료</button>
      </form>
    </>
  );
};
export default Form;
