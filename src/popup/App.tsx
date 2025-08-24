import OauthWidget from "@/components/widgets/popup/OauthWidget";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import PopupErrorFallback from "@/components/features/error/PopoupErrorFallback";
import AppLogo from "@/components/shareds/AppLogo";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={PopupErrorFallback}>
      <div className="popup-logo">
        <AppLogo />
        <div className="popup-logo-text">Promptday</div>
      </div>
      <OauthWidget />
    </ErrorBoundary>
  );
}
