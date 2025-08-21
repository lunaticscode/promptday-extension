import OauthWidget from "@/components/widgets/popup/OauthWidget";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import PopupErrorFallback from "@/components/features/error/PopoupErrorFallback";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={PopupErrorFallback}>
      <OauthWidget />
    </ErrorBoundary>
  );
}
