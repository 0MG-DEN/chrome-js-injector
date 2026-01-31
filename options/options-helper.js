export default class OptionsHelper {
  static async #get() {
    const value = await chrome.storage.local.get({ injectionOptions: {} });
    return value.injectionOptions;
  }

  static async #set(options) {
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

  static async getAll() {
    return OptionsHelper.#get();
  }

  static async set(options) {
    return OptionsHelper.#set(options);
  }
}
