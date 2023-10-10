import { http } from "../utils/network.js";

export type MyProfile = unknown;

export async function fetchMyProfile(): Promise<MyProfile> {
  const json = await http.get("/oauth/my-profile").json<MyProfile>();

  return json;
}
