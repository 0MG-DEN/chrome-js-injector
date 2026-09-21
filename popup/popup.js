const populatePopup = async function() {
	const copyButton = function(button) {
		const clone = button.cloneNode(true);
		return button.parentNode.appendChild(clone);
	}

	const getActions = async function() {
		const message = { type: "get-actions" };
		return chrome.runtime.sendMessage(message);
	}

	const runAction = async function(action) {
		const message = { type: "run-action", action: action };
		return chrome.runtime.sendMessage(message);
	}

	for (const action of await getActions()) {
		var button = button ? copyButton(button) : document.querySelector(".btn-input");
		button.textContent = action;
		button.addEventListener("click", () => runAction(action));
	}
}

populatePopup();
