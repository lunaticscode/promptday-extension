import ProfileWidget from "@/components/widgets/content/ProfileWidget";
import PromptWidget from "@/components/widgets/content/PromptWidget";
import { AppError } from "@/utils/error";
import { createContext, useContext, useState } from "react";

interface ContentContextProps {
  isSignin: boolean;
  handleChangeSigninStatus: (signin: boolean) => void;
}
const ContentContext = createContext<ContentContextProps | null>(null);
export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new AppError("ui", "INVALID_UI_CONTEXT_SCOPE");
  }
  return context;
};

const ContentContainer = () => {
  const [isSignin, setIsSignin] = useState<boolean>(false);
  const handleChangeSigninStatus = (signin: boolean) => {
    setIsSignin(signin);
  };

  const contextValue: ContentContextProps = {
    isSignin,
    handleChangeSigninStatus,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      <ProfileWidget />
      <PromptWidget />
    </ContentContext.Provider>
  );
};
export default ContentContainer;
