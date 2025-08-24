import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "@hw-rui/button";
import { useContentContext } from "@/content/views/ContentContainer";
// import { getUsageFromServer } from "@/service-worker/usage";
import LoadingSpinner from "@/components/shareds/LoadingSpinner";
import useExtractDateFromPrompt from "@/components/hooks/useExtractDate";
import PromptResult from "@/components/features/prompt/PromptResult";

const selectedTextPlaceholder =
  "1) 🖱️Drag the schedule-related content.\n2) Right Click (You will see context menus).\n3) Select '📅 Promptday - Extract date'.";

const PromptWidget = () => {
  const { isSignin } = useContentContext();
  const { isLoading, result, extract, extraLoadingMessage } =
    useExtractDateFromPrompt();
  const [selectedText, setSelectedText] = useState("");

  const extractButtonDisabled = useMemo(
    () => !isSignin || isLoading || !selectedText,
    [!isSignin || isLoading || !selectedText]
  );

  const setupSelectedTextListener = () => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "selected-text") {
        const text = msg.text;
        setSelectedText(text);
      }
    });
  };
  const handleChangeText = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedText(value);
  };

  const handleClickExtract = () => {
    if (extractButtonDisabled) return;
    extract(selectedText);
    // getUsageFromServer();
  };

  useEffect(() => {
    setupSelectedTextListener();
  }, []);

  return (
    <div className="prompt-area">
      <div className="prompt-area-header">
        <h3>Selected Text</h3>
      </div>
      <div className="prompt-area-selected-text">
        <textarea
          readOnly
          onChange={handleChangeText}
          className={"prompt-selected-text"}
          value={selectedText}
          placeholder={selectedTextPlaceholder}
        />
      </div>
      <div className="prompt-area-submit-button">
        <Button
          disabled={extractButtonDisabled}
          onClick={handleClickExtract}
          className={"prompt-submit-button"}
          variant="positive"
        >
          {isLoading ? <LoadingSpinner /> : "Extract"}
        </Button>
      </div>
      <div>
        <PromptResult
          isLoading={isLoading}
          extraLoadingMessage={extraLoadingMessage}
          data={result}
        />
      </div>
    </div>
  );
};
export default PromptWidget;
