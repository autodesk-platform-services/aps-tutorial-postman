# Fusion Automation API Add-In

## Installation

Install and setup the Fusion Automation API Add-In:

* On Windows run the `FusionAutomationAPIAddIn-win64-[version].msi` installer
* On Mac run the `FusionAutomationAPIAddIn-macos-[version].pkg` installer
* The Add-In should now be installed and set to run on startup in Fusion

## Run Typescript Script Locally

* Run the command “Design > Utilities > Add-ins > Fusion Automation API”
* Press `Create Script`
* Insert name
* Select the new add-in from the dropdown
* Press `Edit Script`
* VS code should launch
  * Install the recommended Extension
* Press `Run Locally`
  * See the output in the Output window in VS Code
  * See the output in the Text Commands window in Fusion

## Run Typescript Script with the Fusion Automation API

* Follow the steps outlined in the “Run Typescript Script Locally” section
* Press the settings icon in the bottom left corner of VS Code window
* Select Settings > Extensions > Fusion Automation API
  * Activity ID refers to the engine version. Using “Fusion.ScriptJob+Latest” is recommended
  * Environment should be “prd”
* Open the VS Code command dialog (top middle bar, or ctrl+p on Windows). Typing ">secrets" will display available commands for inputting secrets
  * For information on how to obtain a Personal Access Token see this tutorial (<https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/fusion/task5-post-workitem/>)
  * For information on where to get a Client ID and a Client Secret, see this tutorial (<https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/>)
* Return to the script and press the “Run Remotely” button
  * See the output in the Output window in VS Code
