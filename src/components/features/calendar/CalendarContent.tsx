// https://rui.hw-lab.site/components/calendar#usage
import Calendar from "@hw-rui/calendar";

const CalendarContent = () => {
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
