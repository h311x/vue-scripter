import { defineManifest } from "@crxjs/vite-plugin"

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === "staging" ? "[INTERNAL] Scripter" : "Scripter",
  // up to four numbers separated by dots
  version: `1.0.0`,
  permissions: ["tabs", "storage", "activeTab", "scripting"],
  options_ui: {
    page: "src/options/index.html",
    open_in_tab: true,
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  action: {
    default_popup: "src/popup/index.html",
  },
  content_scripts: [
    {
      js: ["src/content/index.ts"],
      matches: ["http://*/*", "https://*/*"],
      // matches: ["https://www.google.com/*"],
    },
  ],
  host_permissions: ["*://*/"],
}))
