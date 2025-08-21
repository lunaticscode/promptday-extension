import { useEffect, useState } from "react";
import Button from "@hw-rui/button";

const PromptWidget = () => {
  const [selectedText, setSelectedText] = useState("");
  const setupSelectedTextListener = () => {
    console.log("setupSelectedTextListener");
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "selected-text") {
        const text = msg.text;
        setSelectedText(text);
      }
    });
  };
  useEffect(() => {
    setupSelectedTextListener();
  }, []);
  return (
    <>
      <h3>Prompt</h3>
      <div>
        <textarea className={"prompt-selected-text"} value={selectedText} />
        <Button className={"prompt-submit-button"} variant="positive">
          Extract
        </Button>
      </div>
    </>
  );
};
export default PromptWidget;
