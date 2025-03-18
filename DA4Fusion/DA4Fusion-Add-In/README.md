# Design Automation for Fusion Add-In

## Installation

Install and setup the Design Automation for Fusion Add-In:

### Installer
* On Windows run the `DesignAutomationForFusionAddIn-win64.msi` installer
* On Mac run the `DesignAutomationForFusionAddIn-macos.pkg` installer
* The Add-In should now be installed and set to run on startup in Fusion

### Manual Installation
* Download the zip package and unpack it to `%APPDATA%/Autodesk/Autodesk Fusion 360/API/AddIns` for windows or `'Users/USERNAME/Library/Application Support/Autodesk/Autodesk Fusion 360/API/AddIns` for Mac
* Open Fusion and navigate to the Scripts and Add-Ins command under Utilities -> Add-Ins
* Find and run the "Design Automation for Fusion Add-in", ideally check "Run on Startup"

## Run Typescript Script Locally

* Run the command “Design -> Utilities > Add-ins > Design Automation for Fusion”
* Press `Create Script`
* Insert name
* Select the new add-in from the dropdown
* Press `Edit Script`
* VS code should launch
  * Install the recommended Extension
* Press `Run Locally`
  * See the output in the Output window in VS Code
  * See the output in the Text Commands window in Fusion

## Run Typescript Script with the Design Automation API for Fusion

* Follow the steps outlined in the “Run Typescript Script Locally” section
* Press the settings icon in the bottom left corner of VS Code window
* Select Settings > Extensions > Design Automation for Fusion
  * Activity ID refers to the engine version. Using “Fusion.ScriptJob+Latest” is recommended
  * For information on where to get a Client ID and a Client Secret, see this tutorial (<https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/>)
  * Environment should be “prd”
  * For information on how to obtain a Personal Access Token see this tutorial (<https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/fusion/task5-post-workitem/>)
* Return to the script and press the “Run Remotely” button
  * See the output in the Output window in VS Code
