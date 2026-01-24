import OptionsHelper from "./options/options-helper.js";

const processMessage = async (message, sender, sendResponse) => {
  if (message !== "inject-scripts")
    return;

  const files = await OptionsHelper.getScripts(sender.origin);

  if (files.length < 1)
    return;

  await chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    files: [...new Set(files)] // Uniquify.
  });

  sendResponse({ injectedScripts: files });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  processMessage(message, sender, sendResponse);
  return true; // Allows to send a response in an async listener.
});
