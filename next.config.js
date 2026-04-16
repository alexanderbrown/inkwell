/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { networkInterfaces } from "os";

// const localIPs = Object.values(networkInterfaces())
//   .flat()
//   .filter((iface) => iface?.family === "IPv4" && !iface.internal)
//   .map((iface) => iface?.address || "");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost.*",],

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  devIndicators: false
};

export default config;
