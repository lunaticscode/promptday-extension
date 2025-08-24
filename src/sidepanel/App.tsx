import AppLogo from "@/components/shareds/AppLogo";
import "./App.css";

export default function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <AppLogo />
        <h2>Promtday Side-Pannel</h2>
      </div>

      <h3>
        {"🛠️ Almost ready!"}
        <br />
        Please stay with us a little longer.
      </h3>
    </div>
  );
}
