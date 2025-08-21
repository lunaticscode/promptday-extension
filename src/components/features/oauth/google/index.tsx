import { createContext, FC, useContext, useState } from "react";
import GoogleSignin from "./GoogleSignin";
import GoogleSignout from "./GoogleSignout";
import { AppError } from "@/utils/error";
import ProfileWidget from "@/components/widgets/ProfileWidget";

interface GoogleOauthProps {
  defaultAuth: boolean;
}
interface GoogleOauthContext {
  handleChangeSignin: (signin: boolean) => void;
}
const GoogleOauthContext = createContext<GoogleOauthContext | null>(null);
export const useGoogleOauthContext = () => {
  const context = useContext(GoogleOauthContext);
  if (!context) {
    throw new AppError("ui", "INVALID_UI_CONTEXT_SCOPE");
  }
  return context;
};
const GoogleOauth: FC<GoogleOauthProps> = ({ defaultAuth }) => {
  const [isSignin, setIsSignin] = useState<boolean>(defaultAuth);

  const handleChangeSignin = (signin: boolean) => {
    setIsSignin(signin);
  };

  const contextValue: GoogleOauthContext = {
    handleChangeSignin,
  };

  return (
    <GoogleOauthContext.Provider value={contextValue}>
      <ProfileWidget isSignin={isSignin} />
      <div className={"google-oauth-buttons"}>
        {isSignin ? <GoogleSignout /> : <GoogleSignin />}
      </div>
    </GoogleOauthContext.Provider>
  );
};
export default GoogleOauth;
