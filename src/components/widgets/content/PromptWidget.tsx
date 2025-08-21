import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "@hw-rui/button";
import { useContentContext } from "@/content/views/ContentContainer";
import { getUsageFromServer } from "@/service-worker/usage";

const PromptWidget = () => {
  const { isSignin } = useContentContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState("");

  const extractButtonDisabled = useMemo(
    () => !isSignin || isLoading,
    [!isSignin || isLoading]
  );
  // console.log({ extractButtonDisabled });

  const setupSelectedTextListener = () => {
    // console.log("setupSelectedTextListener");
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
    // console.log("handleClickExtract");
    getUsageFromServer();
  };

  useEffect(() => {
    setupSelectedTextListener();
  }, []);

  return (
    <>
      <h3 style={{ marginBottom: "0.5rem" }}>Target Text</h3>
      <div>
        <textarea
          readOnly
          onChange={handleChangeText}
          className={"prompt-selected-text"}
          value={selectedText}
        />
        <Button
          disabled={extractButtonDisabled}
          onClick={handleClickExtract}
          className={"prompt-submit-button"}
          variant="positive"
        >
          Extract
        </Button>
      </div>
    </>
  );
};
export default PromptWidget;
