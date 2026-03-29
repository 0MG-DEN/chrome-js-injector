export default class OptionsHelper {
  static async #handleVersion(options) {
    const version = options?.meta?.version;
    if (!version)
      throw new Error("Invalid options: no version found");
    if (version > "07EA031D-1.0") // Update this version.
      throw new Error("Invalid options: future versions are not supported");
    // Add previous versions handling here.
    return options;
  }

  static async #get() {
    const value = await chrome.storage.local.get({ injectionOptions: {} });
    const options = value.injectionOptions;
    options.meta = options.meta || { version: "07EA031D-1.0" }; // Keep this version.
    return await OptionsHelper.#handleVersion(options);
  }

  static async #set(options) {
    options.meta = { version: "07EA031D-1.0" }; // Update this version.
    const value = { injectionOptions: options };
    return chrome.storage.local.set(value);
  }

  static async getScripts(origin, action) {
    const options = await OptionsHelper.#get();
    const key = action ?? "";
    return options[origin]?.[key] ?? [];
  }

  static async getActions(origin) {
    const options = await OptionsHelper.#get();
    delete options[origin]?.[""]; // Delete default scripts.
    return Object.keys(options[origin] ?? {});
  }

  static async getAsObject() {
    const options = await OptionsHelper.#get();
    delete options.meta;
    return options;
  }

  static async getAsJson() {
    const options = await OptionsHelper.#get();
    const json = JSON.stringify(options, null, 2);
    return json;
  }

  static async set(options) {
    return OptionsHelper.#set(options);
  }

  static async parse(text) {
    const parsed = JSON.parse(text); // TODO: Validate.
    const options = await OptionsHelper.#handleVersion(parsed);
    delete options.meta;
    return options;
  }
}
