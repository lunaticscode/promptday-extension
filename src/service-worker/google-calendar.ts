import { AppError, handleUnknownError } from "@/utils/error";
import { getAuthToken } from "./oauth";
import { CalendarProviders } from "@/types/calendar.type";

type CalendarMessageTypes =
  | "calendar-list"
  | "calendar-events"
  | "calendar-event-insert";
type CalendarMessage = {
  type: CalendarMessageTypes;
  provider: CalendarProviders;
  id?: string;
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
      throw new AppError("api", "CALENDAR_LIST_ERROR");
    }
  } catch (err) {
    return handleUnknownError(err);
  }
};

const getCalendarEventsFromGoogle = async (id: string) => {
  try {
    const token = await getAuthToken();
    const request = await fetch(
      `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${encodeURIComponent(
        id
      )}/events`,
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
      throw new AppError("api", "CALENDAR_LIST_ERROR");
    }
  } catch (err) {
    return handleUnknownError(err);
  }
};
let isSetupContextMenu = false;

const setupContextMenu = () => {
  if (isSetupContextMenu) return;
  isSetupContextMenu = true;

  chrome.contextMenus.create({
    id: "add-to-lang-calendar",
    title: "📅 Promptday - Extract date",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "add-to-lang-calendar" && info.selectionText) {
      // TODO: Electron Native Messaging으로 전달
      console.log("Selected text:", info.selectionText);
      // 예시: Native Messaging 준비를 위해 백그라운드에서 저장
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id ?? 0, {
            type: "selected-text",
            text: info.selectionText,
          });
        });
      });
    }
  });
};

chrome.runtime.onInstalled?.addListener((_) => {
  setupContextMenu();
});

chrome.runtime.onMessage.addListener(
  (msg: CalendarMessage, _sender, sendResponse) => {
    (async () => {
      try {
        if (msg.type === "calendar-list") {
          const provider = msg.provider;
          if (provider === "google") {
            const calendarList = await getCalendarListFromGoogle();
            sendResponse({ data: calendarList });
            return;
          }
        }
        if (msg.type === "calendar-events") {
          const { provider, id = "" } = msg;
          if (!id) return { data: null, isError: true };
          if (provider === "google") {
            const events = await getCalendarEventsFromGoogle(id);
            sendResponse({ data: events });
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
export const getCalendarList = async (provider: CalendarProviders) => {
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

/**
 *
 * @param provider oauth provider
 * @param id calendar id
 * @returns
 */
export const getCalendarEvents = async (
  provider: CalendarProviders,
  id: string
) => {
  const response = await chrome.runtime.sendMessage({
    type: "calendar-events",
    provider,
    id,
  });
  const { data } = response;
  console.log(data);
  return data;
};
