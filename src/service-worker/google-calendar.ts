import { AppError, handleError } from "@/utils/error";
import { getAuthToken } from "./oauth";
import { OauthProviders } from "@/types/oauth.type";

type CalendarMessageTypes = "calendar-list" | "get" | "insert";
type CalendarMessage = {
  type: CalendarMessageTypes;
  provider: OauthProviders;
};
const GOOGLE_CALENDAR_API_BASE_URL = "https://www.googleapis.com/calendar/v3";

const getCalendarListFromGoogle = async () => {
  console.log("getCalendarListFromGoogle");
  try {
    const token = await getAuthToken();
    const request = await fetch(
      `${GOOGLE_CALENDAR_API_BASE_URL}/users/me/calendarList`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (request.ok) {
      const response = await request.json();
      return response;
    } else {
      throw new AppError("api", "getCalendarList error");
    }
  } catch (err) {
    return handleError(err);
  }
};

chrome.runtime.onMessage.addListener(
  (msg: CalendarMessage, _sender, sendResponse) => {
    (async () => {
      try {
        if (msg.type === "calendar-list") {
          const provider = msg.provider;
          console.log("calendar-list event response...");
          if (provider === "google") {
            const calendarList = await getCalendarListFromGoogle();
            sendResponse({ data: calendarList });
            return;
          }
        }
      } catch (err) {
        console.error(err);
        sendResponse({ data: null, isError: true });
      }
    })();
    return true;
  }
);

// sender
export const getCalendarList = async (provider: OauthProviders) => {
  const response = await chrome.runtime.sendMessage({
    type: "calendar-list",
    provider,
  });
  const { data } = response;
  if (data && data.items && data.items.length) {
    return data.items;
  } else {
    return null;
  }
};
