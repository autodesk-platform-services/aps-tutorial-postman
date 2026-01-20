/**
 * Hello Fusion
 * Design Automation for Fusion's 'Hello World' sample
 * @returns {object} The parameters passed with the script.
 */

import { adsk } from "@adsk/fas";

function run() {

  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  // Create a document.
  const design = app.activeProduct as adsk.fusion.Design

  // Get the root component of the active design.
  const rootComp = design.rootComponent

  // Create sketch
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchLines = sketch.sketchCurves.sketchLines
  const startPoint = adsk.core.Point3D.create(0, 0, 0)
  const endPoint = adsk.core.Point3D.create(5, 5, 0)
  sketchLines.addTwoPointRectangle(startPoint, endPoint)
  
  // Get the profile defined by the rectangle.
  const prof = sketch.profiles.item(0)
  // Create an extrusion input.
  const features = rootComp.features
  const extrudes = features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  
  // Define that the extent is a distance extent of 5 cm.
  const distance = adsk.core.ValueInput.createByReal(5)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const ext = extrudes.add(extInput)
  
  // Get the body created by extrusion
  const body = ext.bodies.item(0)
  
  // Get a face of the body
  const face = body.faces.item(0)
  
  // Create a construction plane by offset
  const planes = rootComp.constructionPlanes
  const planeInput = planes.createInput()
  const offsetDistance = adsk.core.ValueInput.createByString('5 cm')
  planeInput.setByOffset(face, offsetDistance)
  const plane = planes.add(planeInput)
  
  // Create input entities for mirror feature
  const inputEntites = adsk.core.ObjectCollection.create()
  inputEntites.add(body)
  
  // Create the input for mirror feature
  const mirrorFeatures = features.mirrorFeatures
  const mirrorInput = mirrorFeatures.createInput(inputEntites, plane)
  
  // Create the mirror feature
  const mirrorFeature = mirrorFeatures.add(mirrorInput)
}

run();
