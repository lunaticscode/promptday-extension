import { oauthSignin } from "@/service-worker/oauth";
import { FC } from "react";

interface GoogleSigninProps {
  onSignin: (signin: boolean) => void;
}
const GoogleSignin: FC<GoogleSigninProps> = ({ onSignin }) => {
  const handleClickGoogleSignin = async () => {
    const signinResult = await oauthSignin("google");
    onSignin(signinResult);
  };
  return <button onClick={handleClickGoogleSignin}>Google Signin</button>;
};
export default GoogleSignin;
