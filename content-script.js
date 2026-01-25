const message = { type: "inject-scripts" };
chrome.runtime.sendMessage(message, console.log);
