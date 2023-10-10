import { http } from "../utils/network.js";

export type MyProfile = {
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
  is_default_image: boolean;
};

export async function fetchMyProfile(): Promise<MyProfile | null> {
  const json = await http.get("/oauth/my-profile").json<MyProfile | null>();

  return json;
}
