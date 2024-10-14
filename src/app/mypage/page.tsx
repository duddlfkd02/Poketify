"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/api/supabaseClient";
import Image from "next/image";

interface SpotifyProfile {
  display_name: string;
  images: { url: string }[];
  id: string;
  email: string;
}

interface SupabaseProfile {
  id: string;
  display_name: string;
  profile_image: string | null;
}

export default function MyPage() {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [supabaseProfile, setSupabaseProfile] = useState<SupabaseProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [newProfileImage, setNewProfileImage] = useState<string>("");

  useEffect(() => {
    const getUserProfile = async () => {
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError) {
        setError("Error fetching session");
        return;
      }

      if (session && session.provider_token) {
        try {
          const profileData = await fetchSpotifyProfile(session.provider_token);
          setProfile(profileData);

          // Fetching Supabase profile
          console.log("User ID:", session.user.id); // Log the ID for debugging
          const { data, error: supabaseError } = await supabase
            .from("Poketify")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (supabaseError) {
            throw supabaseError; // Handle the error appropriately
          }

          if (data) {
            setNewDisplayName(data.display_name); // Set to current display name
            setNewProfileImage(
              data.profile_image ||
                "https://jcuipkliefrtpuzxfyhy.supabase.co/storage/v1/object/public/poketify/m_20220509173224_d9N4ZGtBVR.jpeg"
            ); // Default image if none found
          } else {
            setError("Profile not found in Supabase");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError("Failed to fetch profile");
        }
      }
      setLoading(false);
    };

    getUserProfile();
  }, []);

  const updateProfile = async () => {
    if (supabaseProfile) {
      const { error } = await supabase
        .from("Poketify")
        .update({
          display_name: newDisplayName,
          profile_image: newProfileImage
        })
        .eq("id", supabaseProfile.id);

      if (error) {
        setError("Failed to update profile");
      } else {
        alert("Profile updated successfully!");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      {profile?.images && profile.images.length > 0 ? (
        <Image
          src={profile.images[0].url}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full border-2 border-gray-300"
        />
      ) : (
        <Image
          src="https://jcuipkliefrtpuzxfyhy.supabase.co/storage/v1/object/public/poketify/m_20220509173224_d9N4ZGtBVR.jpeg"
          alt="Default Profile Picture"
          width={150}
          height={150}
          className="rounded-full border-2 border-gray-300"
        />
      )}

      <div>
        <label>
          Display Name:
          <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Profile Image URL:
          <input type="text" value={newProfileImage} onChange={(e) => setNewProfileImage(e.target.value)} />
        </label>
      </div>

      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

// Spotify Profile 가져오기
async function fetchSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify profile");
  }

  const profileData = await response.json();
  return profileData;
}
