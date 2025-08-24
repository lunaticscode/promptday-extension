import AppLogo from "@/components/shareds/AppLogo";
import { getIconByProvider } from "@/components/shareds/icons";
import { useContentContext } from "@/content/views/ContentContainer";
import { OauthProfile, OauthProviders } from "@/types/oauth.type";
import { useEffect, useState } from "react";

// Content 전용
const ProfileWidget = () => {
  const { isSignin, handleChangeSigninStatus } = useContentContext();
  const [profile, setProfile] = useState<OauthProfile | null>(null);
  const updateSigninStatus = async () => {
    const profileData = await chrome.storage.local.get("profile");
    if (profileData.profile) handleChangeSigninStatus(true);
    setProfile(profileData.profile ?? null);
  };

  const setupAuthCheckListener = async () => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "signin-signal") {
        handleChangeSigninStatus(msg.isSignin);
        updateSigninStatus();
      }
    });
  };
  const setupInitSigninStatus = () => {
    updateSigninStatus();
  };
  useEffect(() => {
    setupAuthCheckListener();
    setupInitSigninStatus();
  }, []);
  return (
    <div className="content-profile">
      <AppLogo />
      <div className={"content-profile-userdata"}>
        {isSignin && profile && (
          <>
            {getIconByProvider(profile?.provider as OauthProviders)}
            <span className={"content-profile-text-divider"}>|</span>{" "}
            {profile?.name}
          </>
        )}
        {(!isSignin || !profile) && <div>{`(Need to Signin.)`}</div>}
      </div>
    </div>
  );
};
export default ProfileWidget;
