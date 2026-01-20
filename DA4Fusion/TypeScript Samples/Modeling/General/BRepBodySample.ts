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

  // Create a sketch
  const sketches = rootComp.sketches
  const sketch1 = sketches.add(rootComp.yZConstructionPlane)

  // Get sketch lines
  const sketchLines = sketch1.sketchCurves.sketchLines
  // Create sketch rectangle
  const startPoint = adsk.core.Point3D.create(0, 0, 0)
  const endPoint = adsk.core.Point3D.create(5.0, 5.0, 0)
  sketchLines.addTwoPointRectangle(startPoint, endPoint)

  // Get the profile
  const prof = sketch1.profiles.item(0)

  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5.0)

  // Set the distance extent
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Set the extrude type to be solid
  extInput.isSolid = true

  // Create the extrusion
  const ext = extrudes.add(extInput)

  // Get the body with the extrude
  const brepBody = ext.bodies.item(0)

  // Get the original revision id of the BRep Body
  adsk.log(brepBody.revisionId)

  // Set the light bulb besides the body node in the browser to off
  brepBody.isLightBulbOn = false

  // Get the revision id of the BRep Body after having the body's light bulb off
  adsk.log(brepBody.revisionId)

  // Verify if the light bulb is on or off
  adsk.log(brepBody.isLightBulbOn)

  // Verify if the body is visible or not
  adsk.log(brepBody.isVisible)
}

run();
