import Button from "@hw-rui/button";
import { oauthSignout } from "@/service-worker/oauth";
import { useMemo, useState } from "react";
import { useGoogleOauthContext } from ".";

const GoogleSignout = () => {
  const { handleChangeSignin } = useGoogleOauthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleGoogleSignout = async () => {
    setIsLoading(true);
    const signoutResult = await oauthSignout("google");
    handleChangeSignin(!signoutResult);
    setIsLoading(false);
  };

  const disabled = useMemo(() => isLoading, [isLoading]);
  return (
    <Button disabled={disabled} onClick={handleGoogleSignout}>
      Google Signout
    </Button>
  );
};
export default GoogleSignout;
