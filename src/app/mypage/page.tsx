"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/api/supabaseClient";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리
import Image from "next/image";
import { IoCamera } from "react-icons/io5";

export default function MyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ display_name: "", profile_image: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const defaultImageUrl =
    "https://fhecalqtqccmzoqyjytv.supabase.co/storage/v1/object/sign/default-image/profile-image/m_20220509173224_d9N4WGtBVR.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0LWltYWdlL3Byb2ZpbGUtaW1hZ2UvbV8yMDIyMDUwOTE3MzIyNF9kOU40Wkd0QlZSLmpwZWciLCJpYXQiOjE3Mjg5NzM0ODcsImV4cCI6MTczMTU2NTQ4N30.asKmUtvMLC-CUMqRjS8LI2wW3F_YPWzi1ahrGWsyZ64&t=2024-10-15T06%3A24%3A46.699Z";

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error("세션을 가져오는 중에 오류가 발생했습니다.:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = session?.user;
      if (!user) {
        router.push("/auth");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profile")
        .select("display_name, profile_image")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("프로필을 가져오는 중에 오류가 발생했습니다.:", profileError);
        setError(profileError.message);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profile_image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("세션을 가져오는 중 오류:", sessionError);
      setError(sessionError.message);
      return;
    }

    const user = data?.session?.user;
    if (!user) {
      console.error("사용자가 인증되지 않았습니다.");
      return;
    }

    let profileImageUrl = profile.profile_image;

    if (imageFile) {
      try {
        // 이미지 업로드 로직
        const fileExtension = imageFile.name.split(".").pop(); // 파일 확장자 가져오기
        const newFileName = `${uuidv4()}.${fileExtension}`; // UUID로 새 파일명 생성
        const filePath = `profile-image/${user.id}/${newFileName}`; // 파일 경로

        // 파일 업로드
        const { error: uploadError } = await supabase.storage.from("default-image").upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false // 파일 덮어쓰지 않도록 설정
        });

        if (uploadError) {
          console.error("이미지 업로드 중 오류:", uploadError);
          setError(uploadError.message);
          return;
        }

        // Public URL 가져오기
        const { data: publicUrlData } = supabase.storage.from("default-image").getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          profileImageUrl = publicUrlData.publicUrl;
          setProfile((prev) => ({ ...prev, profile_image: profileImageUrl }));
        }
      } catch (error) {
        console.error("이미지 업로드 처리 중 오류:", error);
        setError("이미지 업로드 실패");
        return;
      }
    }

    // 프로필 업데이트
    const { error: updateError } = await supabase
      .from("profile")
      .update({
        display_name: profile.display_name,
        profile_image: profileImageUrl // 저장된 Public URL을 업데이트
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("프로필 업데이트 중 오류:", updateError);
      setError(updateError.message);
    } else {
      console.log("프로필이 성공적으로 업데이트되었습니다.");
      alert("프로필이 수정되었습니다!");
      router.refresh();
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex justify-center wrap mx-auto my-auto">
      <div className="flex flex-col items-center w-full">
        <div className=" mb-7 relative">
          {/* 프로필 이미지 */}
          {profile.profile_image ? (
            <div className="flex items-center justify-center w-[200px] h-[200px] rounded-full border-custom-skyblue border-4 overflow-hidden">
              <Image
                src={profile.profile_image}
                alt="Profile Image"
                width={200}
                height={200}
                className="min-w-full min-h-full object-cover"
                priority
                unoptimized={true}
              />
            </div>
          ) : (
            <Image
              src={defaultImageUrl}
              alt="Default Profile Image"
              width={200}
              height={200}
              className="rounded-full border-custom-blue border-4"
              priority
            />
          )}
          <label
            htmlFor="file-upload"
            className="absolute bottom-0 right-0 mb-3 mr-2 cursor-pointer text-white bg-custom-blue rounded-full p-2 transition duration-200"
          >
            <IoCamera size={23} />
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} id="file-upload" className="hidden" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-[92%] max-w-96">
          <div>
            <label className="block text-lg font-medium">닉네임 변경</label>
            <input
              type="text"
              name="display_name"
              value={profile.display_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md  focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full h-12 bg-custom-skyblue text-white rounded hover:bg-custom-blue transition duration-200 font-bold"
            >
              변경하기
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
