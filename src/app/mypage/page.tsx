"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/api/supabaseClient";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리
import Image from "next/image";

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
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("세션을 가져오는 중에 오류가 발생했습니다.:", sessionError);
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
        // UUID를 사용하여 새 파일 이름 생성
        const fileExtension = imageFile.name.split(".").pop(); // 파일 확장자 가져오기
        const newFileName = `${uuidv4()}.${fileExtension}`; // UUID와 확장자를 결합하여 새 파일 이름 생성
        const filePath = `profile-image/${user.id}/${newFileName}`;

        const { error: uploadError } = await supabase.storage.from("default-image").upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          setError(uploadError.message);
          return;
        }

        const { data: publicUrl } = supabase.storage.from("default-image").getPublicUrl(filePath);
        if (publicUrl) {
          profileImageUrl = publicUrl.publicUrl;

          setProfile((prev) => ({ ...prev, profile_image: profileImageUrl }));
        }
        console.log(profileImageUrl);
      } catch (error) {
        console.error("이미지 업로드를 처리하는 중 오류가 발생했습니다.:", error);
        setError("이미지를 업로드 하지 못 했습니다.");
        return;
      }
    }

    // 프로필 업데이트
    const { error: updateError } = await supabase
      .from("profile")
      .update({
        display_name: profile.display_name,
        profile_image: profileImageUrl
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("프로필을 업데이트 하는 중에 오류가 발생했습니다.:", updateError);
      setError(updateError.message);
    } else {
      console.log("프로필이 업데이트 되었습니다.");
      alert("프로필이 수정되었습니다!");
      router.refresh();
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          {profile.profile_image ? (
            <Image
              src={profile.profile_image}
              alt="Profile Image"
              width={200}
              height={200}
              className="rounded-full"
              priority
            />
          ) : (
            <Image
              src={defaultImageUrl}
              alt="Default Profile Image"
              width={200}
              height={200}
              className="rounded-full"
              priority
            />
          )}
        </div>
        <div className="flex justify-center mb-4">
          <input type="file" accept="image/*" onChange={handleFileChange} id="file-upload" className="hidden" />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gray-400 text-white rounded-md py-2 px-4 hover:bg-gray-600 transition duration-200 font-bold"
          >
            이미지 업로드
          </label>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이름
              <input
                type="text"
                name="display_name"
                value={profile.display_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 h-12 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-200 font-bold"
            >
              프로필 수정
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
