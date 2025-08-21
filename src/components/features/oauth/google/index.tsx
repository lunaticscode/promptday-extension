import { createContext, FC, useContext, useState } from "react";
import GoogleSignin from "./GoogleSignin";
import GoogleSignout from "./GoogleSignout";
import { AppError } from "@/utils/error";

interface GoogleOauthProps {
  defaultAuth: boolean;
}
const GoogleOauthContext = createContext(null);
export const useGoogleOauthContext = () => {
  const context = useContext(GoogleOauthContext);
  if (!context) {
    throw new AppError("ui", "INVALID_UI_CONTEXT_SCOPE");
  }
  return context;
};
const GoogleOauth: FC<GoogleOauthProps> = ({ defaultAuth }) => {
  const [isSignin, setIsSignin] = useState<boolean>(defaultAuth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSignin = (signin: boolean) => {
    if (signin) {
      setIsSignin(true);
    }
  };
  const onSignout = (signout: boolean) => {
    if (signout) {
      setIsSignin(false);
    }
  };

  return (
    <div className={"google-oauth-buttons"}>
      {isSignin ? (
        <GoogleSignout onSignout={onSignout} />
      ) : (
        <GoogleSignin onSignin={onSignin} />
      )}
    </div>
  );
};
export default GoogleOauth;
