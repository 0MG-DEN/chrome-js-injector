import OptionsHelper from "../options/options-helper.js";

const getOrigin = async function () {
  const message = { type: "get-origin" };
  return chrome.runtime.sendMessage(message);
}

const executeScripts = async function (scripts) {
  const message = { type: "execute-scripts", scripts: scripts };
  return chrome.runtime.sendMessage(message, console.log);
}

const assignEvents = async function () {
  const origin = await getOrigin();
  const actions = await OptionsHelper.getActions(origin);

  let lastButton = null;

  for (const action in actions) {
    const scripts = actions[action];
    const button = lastButton
      ? lastButton.parentNode.appendChild(lastButton.cloneNode(true))
      : document.querySelector(".btn-input");

    button.textContent = action;
    button.title = scripts.toString();
    button.addEventListener("click", () => executeScripts(scripts));

    lastButton = button;
  }
}

assignEvents();
