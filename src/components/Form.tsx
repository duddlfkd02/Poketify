"use client";

import { useEffect, useState } from "react";
import { FormType } from "@/types/FormType";
import browserClient from "@/supabase/client";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { UserToken } from "@/types/UserData";

const randomId = crypto.randomUUID();
const initialData = {
  id: randomId,
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
  const router = useRouter();
  const [formData, setFormData] = useState<FormType>(initialData);

  const fetchData = async () => {
    const { data } = await browserClient.from("posts").select().eq("id", params);

    setFormData(data ? data[0] : initialData);
  };

  useEffect(() => {
    const loginData: UserToken = JSON.parse(localStorage.getItem("sb-fhecalqtqccmzoqyjytv-auth-token") as string);

    setFormData({ ...formData, user_nickname: loginData.user.identities[0].identity_data.name });

    if (!!isEdit) {
      fetchData();
    }
  }, []);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const writeHandler = async () => {
    await supabase
      .from("posts")
      .insert({ ...formData, playlist_id: formData.playlist_id.split("playlist/")[1].trim() });
  };

  const editHandler = async () => {
    await supabase
      .from("posts")
      .update({ ...formData })
      .eq("id", params)
      .select();
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.playlist_id || !formData.content) {
      return alert("빈칸 없이 모두 작성해주세요");
    }

    if (isEdit) {
      await editHandler();
    } else {
      await writeHandler();
    }

    router.push(`/community/detail/${randomId}`);
  };

  return (
    <>
      <form
        className="flex flex-col border-t-2 border-solid border-black"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col sm:flex-row items-stretch border-b border-solid border-[#e9e9e9]">
          <label
            className="flex items-center w-full sm:w-1/4 py-3 px-4 bg-[#F8F8F8] leading-snug break-keep"
            htmlFor="title"
          >
            제목
          </label>
          <div className="w-full sm:w-3/4  py-3 px-4">
            <input
              className="w-full h-10 px-3 border border-[#e9e9e9] outline-none"
              id="title"
              name="title"
              type="text"
              onChange={(e) => changeInput(e)}
              value={formData?.title}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch border-b border-solid border-[#e9e9e9]">
          <label
            className="flex items-center w-full sm:w-1/4 py-3 px-4 bg-[#F8F8F8] leading-snug break-keep"
            htmlFor="playlist_id"
          >
            플레이리스트 주소
          </label>
          <div className="w-full sm:w-3/4  py-3 px-4">
            <input
              className="w-full h-10 px-3 border border-[#e9e9e9] outline-none"
              id="playlist_id"
              name="playlist_id"
              type="text"
              onChange={(e) => changeInput(e)}
              value={formData?.playlist_id}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch border-b border-solid border-[#e9e9e9]">
          <label
            className="flex items-center w-full sm:w-1/4 py-3 px-4 bg-[#F8F8F8] leading-snug break-keep"
            htmlFor="content"
          >
            내용
          </label>
          <div className="w-full sm:w-3/4  py-3 px-4">
            <input
              className="w-full h-10 px-3 h-10 border border-[#e9e9e9] outline-none"
              id="content"
              name="content"
              type="text"
              onChange={(e) => changeInput(e)}
              value={formData?.content}
            />
          </div>
        </div>

        <button type="submit" className="button">
          완료
        </button>
      </form>
    </>
  );
};
export default Form;
