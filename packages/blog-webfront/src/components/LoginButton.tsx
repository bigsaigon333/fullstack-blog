import queryString from "query-string";
import kakaoLoginButton from "../assets/images/kakao_login_small.png";

const KAKAO_AUTHORIZE_API_ENDPOINT = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_CLIENT_ID = "38dad1a0f1c2a8f2064197351a79e6ed";

const url = `${KAKAO_AUTHORIZE_API_ENDPOINT}?${queryString.stringify(
  {
    response_type: "code",
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: "http://localhost:8080/oauth/kakao/authorize",
  },
  { sort: false }
)}`;

export default function LoginButton() {
  return (
    // TODO: 로그인 처리가 다 끝난 후 기존의 url 으로 돌아가야함
    <a href={url}>
      <img src={kakaoLoginButton} alt="카카오 로그인" />
    </a>
  );
}
