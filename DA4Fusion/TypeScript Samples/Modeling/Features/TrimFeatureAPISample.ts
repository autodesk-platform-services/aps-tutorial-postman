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
  const sketchCircle = sketchCircles.addByCenterRadius(centerPoint, 3.0)

  // Create a open profile for extrusion.
  const openProfile = rootComp.createOpenProfile(sketchCircle)

  // Create an extrusion input.
  const features = rootComp.features
  const extrudes = features.extrudeFeatures
  const extrudeInput = extrudes.createInput(openProfile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeInput.isSolid = false

  // define that the extent is a distance extent of 3 cm
  const distance = adsk.core.ValueInput.createByReal(3.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extrudeInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const extrude = extrudes.add(extrudeInput)

  // Get the body created by extrusion
  const body = extrude.bodies.item(0)

  // Create sketch 2.
  const sketch2 = sketches.add(rootComp.xYConstructionPlane);
  const sketchLines = sketch2.sketchCurves.sketchLines;
  const startPoint = adsk.core.Point3D.create(-5, 0, 0);
  const endPoint = adsk.core.Point3D.create(5, 0, 0);
  const sketchLine = sketchLines.addByTwoPoints(startPoint, endPoint);
  const openProfile2 = rootComp.createOpenProfile(sketchLine);

  // Create a open profile for extrusion.
  const extrudeInput2 = extrudes.createInput(openProfile2, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeInput2.isSolid = false

  // Define the extent
  const distance2 = adsk.core.ValueInput.createByReal(5.0)
  const distanceExtentDef2 = adsk.fusion.DistanceExtentDefinition.create(distance2)
  extrudeInput2.setOneSideExtent(distanceExtentDef2, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  extrudes.add(extrudeInput2)

  // Create trim feature
  const trims = features.trimFeatures
  const trimInput = trims.createInput(body)
  const cells = trimInput.bRepCells
  cells.item(0).isSelected = true
  trims.add(trimInput)
}

run();