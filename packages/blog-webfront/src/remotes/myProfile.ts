import ky from "ky";
import { http } from "../utils/network.js";

export type MyProfile = {
  id: number;
  role: "admin" | "user";
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
  is_default_image: boolean;
};

export async function fetchMyProfile(): Promise<MyProfile | null> {
  const json = await http.get("/oauth/my-profile").json<MyProfile | null>();

  return json;
}

export async function logout(): Promise<true | null> {
  const json = await ky.post("/oauth/logout").json<true | null>();

  return json;
}
