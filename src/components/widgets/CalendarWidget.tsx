import { useEffect, useRef, useState } from "react";
import CalendarContent from "../features/calendar/CalendarContent";
import CalendarProviderTabs, {
  CalendarProviders,
} from "../features/calendar/CalendarProviderTabs";
import { getCalendarList } from "@/service-worker/google-calendar";

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
    console.log(calendarList);
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
