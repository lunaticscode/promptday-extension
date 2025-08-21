import { oauthSignout } from "@/service-worker/oauth";
import { FC } from "react";

interface GoogleSignoutProps {
  onSignout: (signout: boolean) => void;
}
const GoogleSignout: FC<GoogleSignoutProps> = ({ onSignout }) => {
  const handleGoogleSignout = async () => {
    const signoutResult = await oauthSignout("google");
    onSignout(signoutResult);
  };
  return (
    <>
      <button onClick={handleGoogleSignout}>Google Signout</button>
    </>
  );
};
export default GoogleSignout;
