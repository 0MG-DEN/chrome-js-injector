# Introduction

This extension allows you to inject custom scripts into websites specified in the settings.

# Installation

1. Clone this repository or download and unpack the release archive.
2. Load the unpacked extension as described [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).
3. Place your custom scripts into the `scripts` subfolder.
4. Navigate to the Extensions page, select **JavaScript Injector**, and then click **Extension options**.
5. Enter the origins and the corresponding paths to your script files.
6. (Optional) Enter the action names.
7. (Optional) Enable the extension to run in Incognito mode.

>[!NOTE]
>Scripts with action names are not injected when a page loads.\
>Instead, they appear as buttons in the extension's popup.

# Testing the Extension

By default, the release includes a `test-alert.js` script file. To see a demonstration:
1. In the extension options, enter `https://www.google.com` in the **Origin** column and `/scripts/test-alert.js` in the **Script** column.
2. Click **Save Changes** at the top.
3. Open the [Google homepage](https://www.google.com/). An alert should appear, confirming the script has been injected.
