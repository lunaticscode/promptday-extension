export type OauthProviders = "google" | "ms";
export type OauthProfile = {
  email: string;
  provider: string;
  name?: string;
  picture: string;
};
