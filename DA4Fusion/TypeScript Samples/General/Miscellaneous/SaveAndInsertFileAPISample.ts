import { adsk } from "@adsk/fas";

function CreateCylinderDesign(app: adsk.core.Application, filename: string) {

  //Create a new document and have it be invisible.
  const cylinderDoc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType, true) as adsk.fusion.FusionDocument

  // Get the Design and root component from the document.
  const des = cylinderDoc.products.itemByProductType('DesignProductType') as adsk.fusion.Design
  const root = des.rootComponent

  // Create a sketch with a single circle.
  const sk: adsk.fusion.Sketch = root.sketches.add(root.yZConstructionPlane) as adsk.fusion.Sketch
  const point = adsk.core.Point3D.create(3, 2, 0) as adsk.core.Point3D
  sk.sketchCurves.sketchCircles.addByCenterRadius(point, 4)
  const prof = sk.profiles.item(0) as adsk.fusion.Profile
  const value = adsk.core.ValueInput.createByReal(12) as adsk.core.ValueInput
  // Create an extrusion, using the circle.
  root.features.extrudeFeatures.addSimple(prof, value, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Save the document.
  cylinderDoc.saveAs(filename, defaultFolder(app, "Fusion Automation API"), 'Sample demonstrating watching for the save to complete.', '')
  while (app.hasActiveJobs) {
    wait(2000);
  }

  // Close the document.
  docId = cylinderDoc.creationId
  cylinderDoc.close(false)
}

function wait(ms: number) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < ms) adsk.doEvents();
}

function defaultFolder(app: adsk.core.Application, defaultProjectName: string) {
  const projects = app.data.activeHub.dataProjects;
  if (!projects) throw Error("Unable to get active hub's projects.");
  for (let i = 0; i < projects.count; ++i) {
    const project = projects.item(i)!;
    if (project.name === defaultProjectName) {
      return project.rootFolder;
    }
  }
  adsk.log(`Creating new project: ${defaultProjectName}`);
  const project = projects.add(defaultProjectName);
  if (!project) throw Error("Unable to create new project.");
  return project.rootFolder;
}

let docId = ''
const newFilename = 'SampleSaveTypeScript'

function run() {

  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Get a active document
  const doc = app.activeDocument

  if (!doc.isSaved) {
    adsk.log('The active document must be saved before running this script.')
    return
  }

  const onDataFileComplete = {
    notify: (args: adsk.core.DataEventArgs) => {

      // Check to see if the document we care about is the one that saved.
      adsk.log('event fired')

      if (args.file.name == newFilename) {
        const cylinderDoc = args.file

        const topDoc = app.activeDocument

        // Insert the saved document into the activate document.
        const des = topDoc.products.itemByProductType('DesignProductType') as adsk.fusion.Design
        const root = des.rootComponent
        adsk.log('Inserting document into active document')
        const cylOcc = root.occurrences.addByInsert(cylinderDoc, adsk.core.Matrix3D.create(), true)
        adsk.log('Document inserted into active document')
      }
    },
  };

  app.dataFileComplete.add(onDataFileComplete)
  const handlers: any[] = []
  handlers.push(onDataFileComplete)

  // Create a new design with a cylinder.
  const newDoc = CreateCylinderDesign(app, newFilename)
}

run();
