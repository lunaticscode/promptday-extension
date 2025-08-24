import Logo from "@/assets/crx.svg";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ContentContainer from "./ContentContainer";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const setupSigninSignalListerner = () => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "signin-signal" && msg.isSignin) {
        setShow(true);
      }
    });
  };
  useEffect(() => {
    setupSigninSignalListerner();
  }, []);
  const MemorizedContent = useMemo(() => <ContentContainer />, []);
  return (
    <>
      <div className={`popup-container ${!show ? "opacity-0" : ""}`.trim()}>
        <div className={`popup-content ${show ? "opacity-100" : "opacity-0"}`}>
          {MemorizedContent}
        </div>
      </div>
      <button className="toggle-button" onClick={toggle}>
        <img src={Logo} alt="Promptday logo" className="button-icon" />
      </button>
    </>
  );
}

export default App;
