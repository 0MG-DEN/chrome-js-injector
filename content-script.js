(async function () {
  console.log("JavaScript Injector running...");

  const host = document.location.host;
  const files = await OptionsHelper.getScripts(host);

  for (let file of files) {
    const script = document.createElement("script");
    script.type = "application/javascript";
    script.src = chrome.runtime.getURL(file);
    document.body.appendChild(script);
  }

  console.log("JavaScript Injector completed.");
})();
