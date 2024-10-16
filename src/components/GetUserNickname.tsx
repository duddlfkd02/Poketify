import { supabase } from "@/supabase/supabase";
import { UserToken } from "@/types/UserData";

type DisplayName = {
  display_name: string;
};

const GetUserNickname = async () => {
  const loginData: UserToken = JSON.parse(localStorage.getItem("sb-fhecalqtqccmzoqyjytv-auth-token") as string);
  const { data } = await supabase.from("profile").select("display_name").eq("id", loginData.user.id);
  const nickName = data as DisplayName[];

  return {
    userId: loginData.user.id,
    userNickname: nickName[0].display_name
  };
};
export default GetUserNickname;
