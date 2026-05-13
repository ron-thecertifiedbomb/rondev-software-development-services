import { exec } from "node:child_process";
import os from "node:os";

const url = process.argv[2] || "http://localhost:3000";
const platform = os.platform();

const browsers = [
  {
    name: "Google Chrome",
    win: `start "" chrome --incognito "${url}"`,
    mac: `open -na "Google Chrome" --args --incognito "${url}"`,
    linux: `google-chrome --incognito "${url}"`,
  },
  {
    name: "Brave",
    win: `start "" brave --incognito "${url}"`,
    mac: `open -na "Brave Browser" --args --incognito "${url}"`,
    linux: `brave-browser --incognito "${url}"`,
  },
  {
    name: "Firefox",
    win: `start "" firefox --private-window "${url}"`,
    mac: `open -na "Firefox" --args -private-window "${url}"`,
    linux: `firefox --private-window "${url}"`,
  },
];

console.log(`Opening ${url} in multiple browsers...`);

browsers.forEach((browser) => {
  const cmd =
    platform === "win32"
      ? browser.win
      : platform === "darwin"
        ? browser.mac
        : browser.linux;

  exec(cmd, (err) => {
    if (err) {
      console.error(
        `⚠️ Failed to open ${browser.name} - It might not be installed or added to your PATH.`,
      );
    } else {
      console.log(`✅ Opened ${browser.name} in incognito/private mode.`);
    }
  });
});
