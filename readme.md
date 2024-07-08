# Postman Collections for Tutorials on APS Developer Portal

This repository provides Postman Collections for example workflows available with the API documentation on the [Autodesk Platform Services (APS) Portal](https://aps.autodesk.com/).  These collections offer a user-friendly alternative to the cURL commands used in the tutorials, simplifying the workflow and enabling easy experimentation.

Currently, this repository contains Postman Collections for the following example workflows:

## Design Automation:

   | Example Workflow                     | Postman Collection                   | Tutorial on APS Portal                                                    |
   |--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------|
   | Execute a MaxScript                  | [DA43dsMax](DA43dsMax)               | https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/3dsmax/   |
   | Execute an AutoCAD Plug-in           | [DA4ACAD](DA4ACAD)                   | http://https://aps.autodesk.autodesk.com/en/docs/design-automation/v3/tutorials/autocad/   |
   | Execute an Inventor Add-in           | [DA4Inventor](DA4Inventor)           | https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/inventor/ |
   | Execute a Revit Add-in               | [DA4Revit](DA4Revit)                 | https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/revit/    |


## Model Derivative:

   | Tutorial                                                      | Postman Collection                       | Tutorial on APS Portal                                                                                                |
   |---------------------------------------------------------------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
   | Translate a Source File                                       | [ModelDerivative_01](ModelDerivative_01) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/translate-to-obj/                      |
   | Translate a Source File Packaged as a Zip File                | [ModelDerivative_02](ModelDerivative_02) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/translate-zip-to-stl/                  |
   | Translate a Source File that Contains References              | [ModelDerivative_03](ModelDerivative_03) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/translate-source-file-containing-xref/ |
   | Prepare a File for the Viewer                                 | [ModelDerivative_04](ModelDerivative_04) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/prep-file4viewer/                      |
   | Extract Metadata from a Source File                           | [ModelDerivative_05](ModelDerivative_05) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/xtract-metadata/                       |
   | Extract Geometry from a Source File                           | [ModelDerivative_06](ModelDerivative_06) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/xtract-geometry-from-source-file/      |   
   | Translate a Revit File, Generating Room and Space Information | [ModelDerivative_07](ModelDerivative_07) | https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/prep-roominfo4viewer/                  |


## What's Postman?

Postman is a widely used tool that provides a Visual UI for sending HTTP requests to services providing REST APIs, like those offered by Autodesk Platform Services (APS). The Postman collections provided in this repository contain pre-populated requests specifically designed for tutorials provided on the APS portal. Scripts within each collection parse the responses you receive and save relevant data to Postman Variables. This allows response data to be automatically fed into subsequent requests, minimizing effort when following tutorial workflows. You can also modify the requests and experiment with APS APIs directly within Postman's interface, all without writing a single line of code.

- You can learn how to install and use Postman from [here](https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates).

- You can download the Postman installer from [here](https://www.getpostman.com/downloads/).

## What next?

Click a link in the list of tutorials to navigate to the corresponding folder in this repository. The *readme.md* file in the folder provides instructions that tell you how to run the Postman Collection.
