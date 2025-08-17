import { useEffect, useRef, useState } from "react";
import CalendarContent from "../features/calendar/CalendarContent";
import CalendarProviderTabs, {
  CalendarProviders,
} from "../features/calendar/CalendarProviderTabs";
import { getCalendarList } from "@/service-worker/google-calendar";

const DEFAULT_PROVIDER = "google";

const CalendarWidget = () => {
  const [provider, setProvider] = useState<CalendarProviders>(DEFAULT_PROVIDER);
  const preservedCalendarList = useRef<Record<CalendarProviders, boolean>>({
    google: false,
    ms: false,
  });
  const setupCalendarList = async () => {
    console.log(chrome);
    const calendarList = await getCalendarList();
    console.log({ calendarList });
  };
  useEffect(() => {
    // setupCalendarList();
    if (preservedCalendarList.current[provider]) return;
    preservedCalendarList.current[provider] = true;

    console.log("asdasd");
  }, []);
  const handleClickList = () => {
    setupCalendarList();
  };
  return (
    <>
      <button onClick={handleClickList}>get list</button>
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
