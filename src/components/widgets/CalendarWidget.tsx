import { useEffect, useRef, useState } from "react";
import CalendarContent from "../features/calendar/CalendarContent";
import CalendarProviderTabs, {
  CalendarProviders,
} from "../features/calendar/CalendarProviderTabs";
import {
  getCalendarEvents,
  getCalendarList,
} from "@/service-worker/google-calendar";

const DEMO_CALENDAR_EVENT_ID =
  "c_3de1dc4a4ee57bbac186b652a8ee2bb1d105ebf3cc3cc77bda85c5505ba1f848@group.calendar.google.com";
const DEFAULT_PROVIDER = "google";
type CalendarListMap = Record<CalendarProviders, any[]>;
const DEFAULT_CALENDAR_LIST_MAP: CalendarListMap = { google: [], ms: [] };

const CalendarWidget = () => {
  const [provider, setProvider] = useState<CalendarProviders>(DEFAULT_PROVIDER);
  const [calendarListMap, setCalendarListMap] = useState<
    Record<CalendarProviders, any[]>
  >(DEFAULT_CALENDAR_LIST_MAP);
  const preservedCalendarList = useRef<Record<CalendarProviders, boolean>>({
    google: false,
    ms: false,
  });
  const setupCalendarList = async () => {
    const calendarList = await getCalendarList(provider);
    // console.log(calendarList);
    if (calendarList) {
      preservedCalendarList.current[provider] = true;
      setCalendarListMap((prev) => ({ ...prev, [provider]: calendarList }));
    }
  };

  useEffect(() => {
    if (preservedCalendarList.current[provider]) return;
    setupCalendarList();
  }, [provider]);

  return (
    <>
      <button
        onClick={() => getCalendarEvents("google", DEMO_CALENDAR_EVENT_ID)}
      >
        get-events
      </button>
      <CalendarProviderTabs
        onChangeTabItem={(_provider) => setProvider(_provider)}
      >
        <CalendarProviderTabs.Item value={provider}>
          Google
        </CalendarProviderTabs.Item>
        <CalendarProviderTabs.Item value={"ms"}>MS</CalendarProviderTabs.Item>
      </CalendarProviderTabs>
      <CalendarContent />
    </>
  );
};
export default CalendarWidget;
