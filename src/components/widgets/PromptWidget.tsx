import { CSSProperties, useEffect, useState } from "react";

const selectedTextWrapper: CSSProperties = {
  width: "100%",
  height: "300px",
  overflow: "auto",
  textAlign: "left",
};

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
        <textarea value={selectedText} style={selectedTextWrapper} />
      </div>
    </>
  );
};
export default PromptWidget;
