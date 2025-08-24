export type ExtractResult = {
  dates: {
    iso: string;
    text: string;
    type: "event" | "deadline" | "sub_event";
  }[];
  location: string;
  organizer: string;
  tags: string[];
  title: string;
};
