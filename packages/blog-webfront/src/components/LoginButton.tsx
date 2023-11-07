import { Spinner } from "flowbite-react";
import queryString from "query-string";
import { Suspense } from "react";
import kakaoLoginButton from "../assets/images/kakao_login_small.png";
import { useMyProfileQuery } from "../hooks/queries/useMyProfile.js";
import { logout } from "../remotes/myProfile.js";
import Authorized from "./Authorized.js";

const KAKAO_AUTHORIZE_API_ENDPOINT = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_CLIENT_ID = "38dad1a0f1c2a8f2064197351a79e6ed";
const API_SERVER_ORIGIN = "http://localhost:8080";

const url = `${KAKAO_AUTHORIZE_API_ENDPOINT}?${queryString.stringify(
  {
    response_type: "code",
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: API_SERVER_ORIGIN + "/oauth/kakao/authorize",
  },
  { sort: false }
)}`;

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
          <a href={url}>
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
