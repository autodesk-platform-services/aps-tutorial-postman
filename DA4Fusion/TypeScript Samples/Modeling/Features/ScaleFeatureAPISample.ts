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
  const circle = sketchCircles.addByCenterRadius(centerPoint, 5.0)

  // Get the profile defined by the circle
  const prof = sketch.profiles.item(0)

  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // # Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  //Create the extrusion
  const ext = extrudes.add(extInput)

  // Get the body created by the extrusion
  const body = ext.bodies.item(0)

  // Create a scale input
  const inputColl = adsk.core.ObjectCollection.create()
  inputColl.add(body)

  const basePt = sketch.sketchPoints.item(0)
  const scaleFactor = adsk.core.ValueInput.createByReal(2)

  const scales = rootComp.features.scaleFeatures
  const scaleInput = scales.createInput(inputColl, basePt, scaleFactor)

  // Set the scale to be non-uniform
  const xScale = adsk.core.ValueInput.createByReal(1.5)
  const yScale = adsk.core.ValueInput.createByReal(3)
  const zScale = adsk.core.ValueInput.createByReal(2)
  scaleInput.setToNonUniform(xScale, yScale, zScale)

  const scale = scales.add(scaleInput)

  // Create another sketch
  const sketchVertical = sketches.add(rootComp.yZConstructionPlane)
  const sketchCirclesVertical = sketchVertical.sketchCurves.sketchCircles
  const centerPointVertical = adsk.core.Point3D.create(0, 10, 0)
  const cicleVertical = sketchCirclesVertical.addByCenterRadius(centerPointVertical, 5)

  // Create an uniformed input for scale feature input
  const inputUniformColl = adsk.core.ObjectCollection.create()
  inputUniformColl.add(sketchVertical)

  const scaleUniformInput = scales.createInput(inputUniformColl, basePt, scaleFactor)

  const scaleUniform = scales.add(scaleUniformInput)
}

run();
