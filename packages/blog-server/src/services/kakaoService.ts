import ky from "ky";

export type KakaoOAuthTokenResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

export async function authorizeKakao(code: string) {
  const CLIENT_ID = "38dad1a0f1c2a8f2064197351a79e6ed";
  const CLIENT_SECRET = "Hh7Bu0ohy0X31Bsg78WDMfXy9vzzEoyG";
  const REDIRECT_URL = "http://localhost:8080/oauth/kakao/authorize";

  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: encodeURI(REDIRECT_URL),
    client_secret: CLIENT_SECRET,
  });

  return await ky
    .post("https://kauth.kakao.com/oauth/token", { body })
    .json<KakaoOAuthTokenResponse>();
}

export async function logoutKakao(
  accessToken: string
): Promise<{ id: number }> {
  return await ky
    .post("https://kapi.kakao.com/v1/user/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<{ id: number }>();
}

export type KakaoProfile = {
  is_default_image: boolean;
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
};

export async function getKakaoProfile(
  accessToken: string
): Promise<{ id: number } & KakaoProfile> {
  const json = await ky
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      searchParams: {
        property_keys: JSON.stringify(["kakao_account.profile"]),
      },
    })
    .json<{ id: number; kakao_account: { profile: KakaoProfile } }>();

  const {
    id,
    kakao_account: { profile },
  } = json;

  return { id, ...profile };
}
