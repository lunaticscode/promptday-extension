export type OauthProviders = "google" | "ms";
export type OauthProfile = {
  email: string;
  provider: OauthProviders;
  name?: string;
  picture: string;
};
