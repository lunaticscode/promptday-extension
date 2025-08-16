import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_icon: {
      48: "public/logo.png",
    },
    default_popup: "src/popup/index.html",
  },
  permissions: ["sidePanel", "contentSettings", "identity", "identity.email"],
  oauth2: {
    client_id:
      "116195706194-etcjp3qck6tqepmnpheulav7ojufau2f.apps.googleusercontent.com",
    scopes: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  },
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://*/*"],
    },
  ],
  background: {
    service_worker: "src/service-worker/index.js",
  },
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
});
