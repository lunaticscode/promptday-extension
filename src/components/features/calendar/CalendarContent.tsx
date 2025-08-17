// https://rui.hw-lab.site/components/calendar#usage
import Calendar from "@hw-rui/calendar";
import { useEffect } from "react";

const CalendarContent = () => {
  useEffect(() => {
    console.log("CalendarContent");
    return () => {
      console.log("Unmount CalendarContent");
    };
  }, []);

  return (
    <Calendar defaultMode="week">
      <Calendar.Modes />
      <Calendar.Current />
      <Calendar.Navigator></Calendar.Navigator>
      <Calendar.Body />
    </Calendar>
  );
};
export default CalendarContent;
