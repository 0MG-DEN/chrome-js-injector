const getActions = async function () {
  const message = { type: "get-actions" };
  return chrome.runtime.sendMessage(message);
}

const runAction = async function (action) {
  const message = { type: "run-action", action: action };
  return chrome.runtime.sendMessage(message);
}

const assignEvents = async function () {
  for (const action of await getActions()) {
    var button = button
      ? button.parentNode.appendChild(button.cloneNode(true))
      : document.querySelector(".btn-input");

    button.textContent = action;
    button.addEventListener("click", () => runAction(action));
  }
}

assignEvents();
