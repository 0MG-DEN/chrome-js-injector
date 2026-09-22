export default class StorageHelper {
	static #currentVersion = "20260323001";

	static async #update(options) { // Update possibly outdated options to valid state.
		const version = options?.meta?.version;
		if (!version)
			throw new Error("Invalid options: no version found");
		if (version > StorageHelper.#currentVersion)
			throw new Error("Invalid options: future versions are not supported");
		// Add previous versions handling here.
		return options;
	}

	static async #get() {
		const value = await chrome.storage.local.get({ injectionOptions: {} });
		const options = value.injectionOptions;
		options.meta = options.meta || { version: "20260323001" }; // Keep this version.
		return await StorageHelper.#update(options);
	}

	static async #set(options) {
		options.meta = { version: StorageHelper.#currentVersion };
		const value = { injectionOptions: options };
		return chrome.storage.local.set(value);
	}

	static async getScripts(origin, action) {
		const options = await StorageHelper.#get();
		const key = action ?? "";
		return options[origin]?.[key] ?? [];
	}

	static async getActions(origin) {
		const options = await StorageHelper.#get();
		delete options[origin]?.[""]; // Delete default scripts.
		return Object.keys(options[origin] ?? {});
	}

	static async getAsObject() {
		const options = await StorageHelper.#get();
		delete options.meta;
		return options;
	}

	static async getAsJson() {
		const options = await StorageHelper.#get();
		const json = JSON.stringify(options, null, 2);
		return json;
	}

	static async set(options) {
		return StorageHelper.#set(options);
	}

	static async parse(text) {
		const parsed = JSON.parse(text); // TODO: Validate.
		const options = await StorageHelper.#update(parsed);
		delete options.meta;
		return options;
	}

	static async update() {
		const options = await StorageHelper.#get();
		const updated = await StorageHelper.#update(options);
		await StorageHelper.#set(updated);
	}
}
