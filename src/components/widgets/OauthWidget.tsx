import GoogleOauth from "../features/oauth/google";
import useAuthStatus from "../hooks/useAuthStatus";

const OauthWidget = () => {
  const { isAuth, isLoading } = useAuthStatus();
  if (isLoading) {
    return <h2>Check AuthStatus....</h2>;
  }
  return (
    <div>
      {/**** google ****/}
      <GoogleOauth defaultAuth={isAuth} />
    </div>
  );
};
export default OauthWidget;
