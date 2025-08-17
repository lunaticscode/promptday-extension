import GoogleSignin from "../features/oauth/GoogleSignin";
import GoogleSignout from "../features/oauth/GoogleSignout";

const OauthWidget = () => {
  return (
    <div>
      <GoogleSignin />
      <GoogleSignout />
    </div>
  );
};
export default OauthWidget;
