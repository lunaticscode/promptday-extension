// https://rui.hw-lab.site/components/tabs/#usage
import { OauthProviders } from "@/types/oauth.type";
import Tabs from "@hw-rui/tabs";
import { FC, PropsWithChildren } from "react";

export type CalendarProviders = OauthProviders;

interface CalendarProviderTabItemProps extends PropsWithChildren {
  value: CalendarProviders;
}

const CalendarProviderTabItem: FC<CalendarProviderTabItemProps> = (props) => {
  const { children, value } = props;
  return <Tabs.Item value={value}>{children}</Tabs.Item>;
};

interface CalendarProviderTabsCompounds {
  Item: typeof CalendarProviderTabItem;
}

interface CalendarProviderTabsProps extends PropsWithChildren {
  onChangeTabItem?: (item: CalendarProviders) => void;
  defaultTabItem?: CalendarProviders;
}

const CalendarProviderTabs: FC<CalendarProviderTabsProps> &
  CalendarProviderTabsCompounds = (props) => {
  const { children, onChangeTabItem, defaultTabItem = "google" } = props;
  const handleChangeTab = (tabItem: CalendarProviders) => {
    onChangeTabItem?.(tabItem);
  };

  return (
    <Tabs
      defaultValue={defaultTabItem}
      onChange={(v) => handleChangeTab(v as CalendarProviders)}
    >
      {children}
    </Tabs>
  );
};

CalendarProviderTabs.Item = CalendarProviderTabItem;
export default CalendarProviderTabs;
