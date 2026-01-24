import OptionsHelper from './options-helper.js';

const saveOptions = async function () {
  const table = document.getElementById("options-table");
  const options = {};

  for (const row of table.tBodies[0].rows) {
    const host = row.querySelector(".txt-host")?.value;
    const file = row.querySelector(".txt-file")?.value;
    if (host && file) {
      options[host] ??= [];
      options[host].push(file);
    }
  }

  await OptionsHelper.setScripts(options);
}

const populateTable = async function () {
  const table = document.getElementById("options-table");
  const options = await OptionsHelper.getAllScripts();

  let lastRow = null;

  for (const host in options) {
    for (const file of options[host]) {
      const row = lastRow ? copyRow.bind(lastRow)() : table.tBodies[0].rows[0];
      row.querySelector(".txt-host").value = host;
      row.querySelector(".txt-file").value = file;
      lastRow = row;
    }
  }
}

document.getElementById("save-changes").addEventListener("click", saveOptions);

populateTable();
