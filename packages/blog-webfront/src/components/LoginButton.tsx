import kakaoLoginButton from "../assets/images/kakao_login_small.png";

export default function LoginButton() {
  return (
    <button
      onClick={() => {
        console.log("onClick");
      }}
    >
      <img src={kakaoLoginButton} alt="카카오 로그인" />
    </button>
  );
}
