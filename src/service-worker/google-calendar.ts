import { AppError, handleError } from "@/utils/error";
import { getAuthToken } from "./oauth";

const GOOGLE_CALENDAR_API_BASE_URL = "https://www.googleapis.com/calendar/v3";

// async function calendarFetch<T>(
//   url: string,
//   token: string,
//   init?: RequestInit
// ): Promise<T> {
//   const res = await fetch(url, {
//     ...init,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       ...(init?.headers || {}),
//     },
//   });
//   if (res.status === 401) {
//     // TODO: 토큰 갱신 로직(필요 시) -> ensureValidToken 개선
//     throw new Error("Unauthorized (401). Access token may be expired.");
//   }
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`Google API Error ${res.status}: ${text}`);
//   }
//   return res.json() as Promise<T>;
// }

const getCalendarList = async () => {
  try {
    console.log(chrome);
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
    const { ok, json } = request;
    if (ok) {
      const response = await json();
      console.log({ response });
      return response;
    } else {
      throw new AppError("api", "getCalendarList error");
    }
  } catch (err) {
    return handleError(err);
  }
};

export { getCalendarList };
