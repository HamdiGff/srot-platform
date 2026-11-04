import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "bd.srot.platform",
  appName: "SROT Agricultural & Veterinary Platform",
  webDir: "public",
  server: {
    // 10.0.2.2 maps to host machine localhost:3000 in Android emulators & BlueStacks
    url: "http://10.0.2.2:3000",
    cleartext: true,
    androidScheme: "https",
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
};

export default config;
