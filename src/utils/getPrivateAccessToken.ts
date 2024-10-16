import { supabase } from "@/supabase/supabase";

export const getPrivateAccessToken = async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Error fetching session: " + error.message);
  }

  const accessToken = session?.provider_token;

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  return accessToken;
};
