import { OauthProviders } from "@/types/oauth.type";
import { AppError } from "@/utils/error";

type OauthMessageTypes = "signin" | "get_profile" | "signout" | "auth-status";

type OauthMessage = {
  type: OauthMessageTypes;
  provider: OauthProviders;
};

export function getAuthToken(): Promise<string> {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (!token || chrome.runtime.lastError) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError?.message);
        }
        throw new AppError("api", "INVALID_GOOGLE_OAUTH_TOKEN");
      }
      // GetAuthToken 타입과 맞지 않음.
      await chrome.storage.local.set({ token });
      resolve(token as string);
    });
  });
}

async function getSavedProfileData() {
  return await new Promise(async (resolve) => {
    await getAuthToken();
    return chrome.storage.local
      .get("profile")
      .then((profile) => {
        return resolve(profile);
      })
      .catch(() => resolve(null));
  });
}

async function clearAllCachedTokens(): Promise<void> {
  await chrome.identity.clearAllCachedAuthTokens();
}

async function fetchGoogleUserinfo(token: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Userinfo HTTP ${res.status}`);
  return res.json();
}

chrome.runtime.onMessage.addListener(
  (msg: OauthMessage, _sender, sendResponse) => {
    (async () => {
      try {
        if (msg.type === "auth-status") {
          const profile = await getSavedProfileData();
          if (profile && Object.keys(profile).length) {
            return sendResponse({ ok: true, profile });
          }
          return sendResponse({ ok: false, profile: null });
        }

        if (msg.type === "get_profile") {
          // authToken + signin + profile
          const token = await getAuthToken(); // 필요 시 자동 갱신/발급
          const profile = await fetchGoogleUserinfo(token);
          const provider = msg.provider;
          const saveProfileData = {
            email: profile.email ?? "(none)",
            name: profile.name ?? "(none)",
            provider,
            picture: profile.picture ?? "(none)",
          };
          await chrome.storage.local.set({
            profile: saveProfileData,
          });
          sendResponse({ ok: true, profile });
          return;
        }

        if (msg.type === "signout") {
          // 캐시 토큰 제거 (강제 재로그인 유도용)
          await clearAllCachedTokens();
          await chrome.storage.local.remove(["profile"]);
          sendResponse({ ok: true, loggedOut: true });
          return;
        }
      } catch (e: any) {
        sendResponse({
          ok: false,
          error: String(e?.message ?? e),
        });
      }
    })();

    // async 응답 유지
    return true;
  }
);

const sendSigninSignal = (isSignin: boolean) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.active) {
        chrome.tabs.sendMessage(tab.id ?? 0, {
          type: "signin-signal",
          isSignin,
        });
      }
    });
  });
};

const oauthSignin = async (provider: OauthProviders) => {
  const signinResult = await chrome.runtime.sendMessage({
    type: "get_profile",
    provider,
  });
  if (signinResult.ok) {
    sendSigninSignal(true);
  }
  return signinResult.ok;
};

const oauthSignout = async (provider: OauthProviders) => {
  const signoutResult = await chrome.runtime.sendMessage({
    type: "signout",
    provider,
  });
  if (signoutResult.ok) {
    sendSigninSignal(false);
  }
  return signoutResult.ok;
};

export { oauthSignin, oauthSignout };
