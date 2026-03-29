import OptionsHelper from "./options-helper.js";

const handleFile = async function () {
  const file = this.files[0];
  const text = await file.text();
  const options = await OptionsHelper.parse(text);
  await populateTable(options);
}

const importFile = async function () {
  const input = document.getElementById("file-input");
  input.click();
}

const exportFile = async function () {
  const json = await OptionsHelper.getAsJson();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = "injection-options.json";
  a.target = "_blank";
  a.href = url;
  a.click();
}

const saveOptions = async function () {
  const table = document.getElementById("options-table");
  const label = document.getElementById("saved-changes");
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

  setTimeout(() => label.style.display = "unset", 1);
  setTimeout(() => label.style.display = "none", 1000);
}

const populateTable = async function (options) {
  options = options || await OptionsHelper.getAsObject();

  const table = document.getElementById("options-table");
  const rows = table.querySelectorAll("tr:not(:first-child)");
  rows.forEach(row => row.remove());

  for (const origin in options) {
    for (const action in options[origin]) {
      for (const script of options[origin][action]) {
        var row = row ? copyRow.bind(row)() : table.tBodies[0].rows[0];
        row.querySelector(".txt-origin").value = origin;
        row.querySelector(".txt-script").value = script;
        row.querySelector(".txt-action").value = action;
      }
    }
  }
}

document.getElementById("file-input").addEventListener("change", handleFile, false);
document.getElementById("import-file").addEventListener("click", importFile);
document.getElementById("export-file").addEventListener("click", exportFile);
document.getElementById("save-changes").addEventListener("click", saveOptions);

populateTable();
