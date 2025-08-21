import { OauthProviders } from "@/types/oauth.type";
import { ReactNode } from "react";
import GoogleIcon from "./GoogleIcon";
import MSIcon from "./MSIcon";

export { default as GoogleIcon } from "./GoogleIcon";

export const getIconByProvider = (
  provider: OauthProviders,
  iconWidth: number = 20
) => {
  const mapProviderToIcon: Record<OauthProviders, () => ReactNode> = {
    google: () => <GoogleIcon width={iconWidth} />,
    ms: () => <MSIcon width={iconWidth} />,
  };
  return mapProviderToIcon[provider]();
};
