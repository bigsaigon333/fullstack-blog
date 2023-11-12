import { RemoteOptions, http } from "../utils/network.js";

export type MyProfile = {
  id: number;
  role: "admin" | "user";
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
  is_default_image: boolean;
};

export async function fetchMyProfile({
  httpClient = http,
  signal,
}: RemoteOptions = {}): Promise<MyProfile | null> {
  const json = await httpClient
    .get("oauth/my-profile", { signal })
    .json<MyProfile | null>();

  return json;
}

export async function logout({
  httpClient = http,
  signal,
}: RemoteOptions = {}): Promise<true | null> {
  const json = await httpClient
    .post("oauth/logout", { headers: { "Content-Type": undefined }, signal })
    .json<true | null>();

  return json;
}
