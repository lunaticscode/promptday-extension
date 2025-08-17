import { oauthSignout } from "@/service-worker/oauth";

const GoogleSignout = () => {
  const handleGoogleSignout = async () => {
    await oauthSignout("google");
  };
  return (
    <>
      <button onClick={handleGoogleSignout}>Google Signout</button>
    </>
  );
};
export default GoogleSignout;
