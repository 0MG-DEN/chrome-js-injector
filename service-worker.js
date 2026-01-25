import OptionsHelper from "./options/options-helper.js";

const getActiveTab = async function () {
  const query = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(query);
  return tab;
};

const injectScripts = function (message, sender, sendResponse) {
  OptionsHelper.getScripts(sender.origin).then(async files => {
    if (files.length < 1) return;
    const options = {
      target: { tabId: sender.tab.id },
      files: [...new Set(files)] // Uniquify.
    };
    await chrome.scripting.executeScript(options);
    sendResponse({ injectedScripts: files });
  });
};

const executeScripts = function (message, sender, sendResponse) {
  getActiveTab().then(async tab => {
    if (!tab?.id) return;
    const options = {
      target: { tabId: tab.id },
      files: [...new Set(message.scripts)] // Uniquify.
    };
    await chrome.scripting.executeScript(options);
    sendResponse({ injectedScripts: message.scripts });
  });
};

const getOrigin = function (message, sender, sendResponse) {
  getActiveTab().then(tab => {
    if (!tab?.url) return;
    const url = new URL(tab.url);
    sendResponse(url.origin);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "inject-scripts")
    injectScripts(message, sender, sendResponse);
  if (message.type === "execute-scripts")
    executeScripts(message, sender, sendResponse);
  if (message.type === "get-origin")
    getOrigin(message, sender, sendResponse);
  return true; // Allows to send a response in an async listener.
});
