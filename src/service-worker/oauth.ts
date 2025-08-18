import { OauthProviders } from "@/types/oauth.type";

type OauthMessageTypes = "signin" | "get_profile" | "signout";

type OauthMessage = {
  type: OauthMessageTypes;
  provider: OauthProviders;
};

export function getAuthToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
        return;
      }
      // GetAuthToken 타입과 맞지 않음.
      resolve(token as string);
    });
  });
}

function removeCachedAuthToken(token: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.identity.removeCachedAuthToken({ token }, async () => {
      await chrome.identity.clearAllCachedAuthTokens();
      return resolve();
    });
  });
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
        if (msg.type === "signin") {
          const token = await getAuthToken();
          sendResponse({ ok: true, token });
          return;
        }

        if (msg.type === "get_profile") {
          const token = await getAuthToken(); // 필요 시 자동 갱신/발급
          const profile = await fetchGoogleUserinfo(token);
          sendResponse({ ok: true, profile });
          return;
        }

        if (msg.type === "signout") {
          // 캐시 토큰 제거 (강제 재로그인 유도용)
          const token = await getAuthToken().catch(() => undefined);
          if (token) await removeCachedAuthToken(token);
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

const oauthSignin = async (provider: OauthProviders) => {
  const signinResult = await chrome.runtime.sendMessage({
    type: "get_profile",
    provider,
  });
  return signinResult;
};

const oauthSignout = async (provider: OauthProviders) => {
  const signoutResult = await chrome.runtime.sendMessage({
    type: "signout",
    provider,
  });
  return signoutResult;
};

export { oauthSignin, oauthSignout };
