import { OauthProfile } from "@/types/oauth.type";
import { FC, useEffect, useState } from "react";

interface ProfileWidgetProps {
  isSignin: boolean;
}
const ProfileWidget: FC<ProfileWidgetProps> = ({ isSignin }) => {
  const [profile, setProfile] = useState<OauthProfile | null>(null);

  const updateProfile = async () => {
    const savedProfile =
      (await chrome.storage.local.get<{ profile: OauthProfile }>("profile"))
        .profile ?? null;
    setProfile(savedProfile);
  };

  useEffect(() => {
    updateProfile();
  }, [isSignin]);
  if (!isSignin) {
    return null;
  }
  return (
    <div>
      {profile?.provider ?? "(none-provider)"} |{" "}
      {profile?.email ?? "(none-email)"}
    </div>
  );
};
export default ProfileWidget;
