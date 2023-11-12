import { KakaoProfile } from "../services/kakaoService.js";

export interface UserProfile extends KakaoProfile {
  id: number;
  role: "admin" | "guest";
}
