import OptionsHelper from "./options-helper.js";

const saveOptions = async function () {
  const table = document.getElementById("options-table");
  const options = {};

  for (const row of table.tBodies[0].rows) {
    const origin = row.querySelector(".txt-origin")?.value;
    const script = row.querySelector(".txt-script")?.value;
    if (origin && script) {
      options[origin] ??= [];
      options[origin].push(script);
    }
  }

  await OptionsHelper.setScripts(options);
}

const populateTable = async function () {
  const table = document.getElementById("options-table");
  const options = await OptionsHelper.getAllScripts();

  let lastRow = null;

  for (const origin in options) {
    for (const script of options[origin]) {
      const row = lastRow ? copyRow.bind(lastRow)() : table.tBodies[0].rows[0];
      row.querySelector(".txt-origin").value = origin;
      row.querySelector(".txt-script").value = script;
      lastRow = row;
    }
  }
}

document.getElementById("save-changes").addEventListener("click", saveOptions);

populateTable();
