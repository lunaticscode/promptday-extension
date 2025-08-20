import { useEffect, useState } from "react";
import GoogleSignin from "../features/oauth/GoogleSignin";
import GoogleSignout from "../features/oauth/GoogleSignout";

const OauthWidget = () => {
  const [isAuth, setIsAuth] = useState(false);
  const checkAuthStatus = async () => {
    const authStatus = await chrome.runtime.sendMessage({
      type: "auth-status",
    });
    // console.log({ authStatus });
    const { ok } = authStatus;
    setIsAuth(ok);
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);
  return (
    <div>
      {!isAuth && <GoogleSignin />}
      {isAuth && <GoogleSignout />}
    </div>
  );
};
export default OauthWidget;
