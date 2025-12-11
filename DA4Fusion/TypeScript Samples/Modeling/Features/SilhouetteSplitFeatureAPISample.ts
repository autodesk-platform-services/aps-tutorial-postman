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
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 5.0)

  // Get the profile defined by the circle
  const prof = sketch.profiles.item(0)
  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)


  // Create the extrusion
  const ext = extrudes.add(extInput)
  // Get the body created by the extrusion
  const body = ext.bodies.item(0)

  // Create SilhouetteSplitFeatureInput
  const silhouetteSplitFeats = rootComp.features.silhouetteSplitFeatures
  const silhouetteSplitInput = silhouetteSplitFeats.createInput(rootComp.xZConstructionPlane, body, adsk.fusion.SilhouetteSplitOperations.SilhouetteSplitFacesOnlyOperation)

  // Create silhouette split feature
  silhouetteSplitFeats.add(silhouetteSplitInput)
}

run();
