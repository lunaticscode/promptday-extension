import { oauthSignin } from "@/service-worker/oauth";

const GoogleSignin = () => {
  const handleClickGoogleSignin = () => {
    oauthSignin("google");
  };
  return <button onClick={handleClickGoogleSignin}>Google Signin</button>;
};
export default GoogleSignin;
