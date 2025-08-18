import Logo from "@/assets/crx.svg";
import { useEffect, useState } from "react";
import "./App.css";
import ContentContainer from "./ContentContainer";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  useEffect(() => {
    console.log("App Mounted");
  }, []);
  return (
    <div className="popup-container">
      {show && (
        <div className={`popup-content ${show ? "opacity-100" : "opacity-0"}`}>
          <ContentContainer />
        </div>
      )}

      <button className="toggle-button" onClick={toggle}>
        <img src={Logo} alt="Promptday logo" className="button-icon" />
      </button>
    </div>
  );
}

export default App;
