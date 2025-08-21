import { AppError } from "@/utils/error";
import { getAuthToken } from "./oauth";

type UsageMessage = {
  type: "get-usage";
};
chrome.runtime.onMessage.addListener(
  (msg: UsageMessage, _sender, sendResponse) => {
    (async () => {
      try {
        if (msg.type === "get-usage") {
          try {
            const token = await getAuthToken();
            const request = await fetch("http://localhost:8088/api/user", {
              headers: {
                token,
              },
            });
            if (request.ok) {
              const response = await request.json();
              console.log({ response });
              return response;
            } else {
              const { status, statusText } = request;
              console.log(status, statusText);
              throw new AppError("api", "GET_USAGE_ERROR");
            }
          } catch (err) {
            throw err;
          }
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

export const getUsageFromServer = async () => {
  const resultUsage = await chrome.runtime.sendMessage({ type: "get-usage" });
  return resultUsage;
};
