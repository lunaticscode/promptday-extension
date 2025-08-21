import Button from "@hw-rui/button";
import { oauthSignin } from "@/service-worker/oauth";
import { useGoogleOauthContext } from ".";
import { useMemo, useState } from "react";

const GoogleSignin = () => {
  const { handleChangeSignin } = useGoogleOauthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClickGoogleSignin = async () => {
    setIsLoading(true);
    const signinResult = await oauthSignin("google");
    handleChangeSignin(signinResult);
    setIsLoading(false);
  };
  const disabled = useMemo(() => isLoading, [isLoading]);
  return (
    <Button disabled={disabled} onClick={handleClickGoogleSignin}>
      Google Signin{isLoading && "....."}
    </Button>
  );
};
export default GoogleSignin;
