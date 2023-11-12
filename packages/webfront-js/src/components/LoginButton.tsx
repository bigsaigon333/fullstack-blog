import { Spinner } from "flowbite-react";
import queryString from "query-string";
import { Suspense } from "react";
import kakaoLoginButton from "../assets/images/kakao_login_small.png";
import { useMyProfileQuery } from "../hooks/queries/useMyProfile.js";
import { logout } from "../remotes/myProfile.js";
import {
  KAKAO_AUTHORIZE_API_ENDPOINT,
  KAKAO_CLIENT_ID,
  PUBLIC_API_SERVER_ORIGIN,
} from "../utils/constants.js";
import Authorized from "./Authorized.js";

export default function LoginButton() {
  const { refetch: refetchMyProfile } = useMyProfileQuery();

  const handleLogout = async () => {
    try {
      await logout();
      await refetchMyProfile();
      window.alert("logout succeed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Authorized
        fallback={
          <a href={getKakaoLoginLink()}>
            <img src={kakaoLoginButton} alt="카카오 로그인" />
          </a>
        }
        expectedRole={"admin"}
        render={(profile) => (
          <button onClick={handleLogout}>
            <img
              src={profile!.thumbnail_image_url}
              alt={profile!.nickname}
              width={30}
              height={30}
              className="rounded"
            />
          </button>
        )}
      />
    </Suspense>
  );
}

function getKakaoLoginLink() {
  const url = `${KAKAO_AUTHORIZE_API_ENDPOINT}?${queryString.stringify(
    {
      response_type: "code",
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: PUBLIC_API_SERVER_ORIGIN + "/oauth/kakao/authorize",
    },
    { sort: false }
  )}`;

  return url;
}
