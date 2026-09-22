import StorageHelper from "./storage-helper.js";

const getActiveTab = async function() {
	const query = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(query);
	return tab;
}

const execute = async function(tabId, scripts) {
	const options = {
		target: { tabId: tabId },
		files: [...new Set(scripts)], // Uniquify.
		world: "MAIN"
	};
	return chrome.scripting.executeScript(options);
}

const injectScripts = async function(message, sender, sendResponse) {
	const scripts = await StorageHelper.getScripts(sender.origin);
	if (scripts.length > 0) {
		await execute(sender.tab.id, scripts);
		sendResponse({ injectedScripts: scripts });
	}
}

const getActions = async function(message, sender, sendResponse) {
	const tab = await getActiveTab();
	if (tab?.url) {
		const origin = new URL(tab.url).origin;
		const actions = await StorageHelper.getActions(origin);
		sendResponse(actions);
	}
}

const runAction = async function(message, sender, sendResponse) {
	const tab = await getActiveTab();
	if (tab?.url && tab.id) {
		const origin = new URL(tab.url).origin;
		const action = message.action;
		const scripts = await StorageHelper.getScripts(origin, action);
		await execute(tab.id, scripts);
		sendResponse(scripts);
	}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// Returning true allows calling sendResponse asynchronously,
	// i.e. after returning from this event listener.
	if (message.type === "inject-scripts") {
		injectScripts(message, sender, sendResponse);
		return true;
	} else if (message.type === "get-actions") {
		getActions(message, sender, sendResponse);
		return true;
	} else if (message.type === "run-action") {
		runAction(message, sender, sendResponse);
		return true;
	}
});

chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === "install" || details.reason === "update") {
		StorageHelper.update();
	}
});
