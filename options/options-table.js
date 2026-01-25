import OptionsHelper from "./options-helper.js";

const saveOptions = async function () {
  const table = document.getElementById("options-table");
  const options = {};

  for (const row of table.tBodies[0].rows) {
    const origin = row.querySelector(".txt-origin")?.value;
    const script = row.querySelector(".txt-script")?.value;
    const action = row.querySelector(".txt-action")?.value;
    if (origin && script) {
      options[origin] ??= {};
      options[origin][action ?? ""] ??= [];
      options[origin][action ?? ""].push(script);
    }
  }

  await OptionsHelper.set(options);
}

const populateTable = async function () {
  const table = document.getElementById("options-table");
  const options = await OptionsHelper.getAll();

  let lastRow = null;

  for (const origin in options) {
    for (const action in options[origin]) {
      for (const script of options[origin][action]) {
        const row = lastRow ? copyRow.bind(lastRow)() : table.tBodies[0].rows[0];
        row.querySelector(".txt-origin").value = origin;
        row.querySelector(".txt-script").value = script;
        row.querySelector(".txt-action").value = action;
        lastRow = row;
      }
    }
  }
}

document.getElementById("save-changes").addEventListener("click", saveOptions);

populateTable();
