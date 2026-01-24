export default class OptionsHelper {
  static async #get() {
    const value = await chrome.storage.local.get({ injectionOptions: {} });
    return value.injectionOptions;
  }

  static async #set(options) {
    const value = { injectionOptions: options };
    return chrome.storage.local.set(value);
  }

  static async getScripts(origin) {
    const options = await OptionsHelper.#get();
    return options[origin] ?? [];
  }

  static async getAllScripts() {
    return OptionsHelper.#get();
  }

  static async setScripts(options) {
    return OptionsHelper.#set(options);
  }
}
