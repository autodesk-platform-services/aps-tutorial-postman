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

  // Create a new sketch on the xy plane.
  const sketches = rootComp.sketches
  const xyPlane = rootComp.xYConstructionPlane
  const sketch = sketches.add(xyPlane)

  // Draw a circle.
  const circles = sketch.sketchCurves.sketchCircles
  const circle1 = circles.addByCenterRadius(adsk.core.Point3D.create(0, 0, 0), 2)

  // Draw a line to use as the axis of revolution.
  const lines = sketch.sketchCurves.sketchLines
  const axisLine = lines.addByTwoPoints(adsk.core.Point3D.create(-1, -5, 0), adsk.core.Point3D.create(1, -5, 0))

  // Get the profile defined by the circle.
  const prof = sketch.profiles.item(0)

  // Create an revolution input to be able to define the input needed for a revolution
  // while specifying the profile and that a new component is to be created
  const revolves = rootComp.features.revolveFeatures
  const revInput = revolves.createInput(prof, axisLine, adsk.fusion.FeatureOperations.NewComponentFeatureOperation)

  // Define that the extent is an angle of pi to get half of a torus.
  const angle = adsk.core.ValueInput.createByReal(Math.PI)
  revInput.setAngleExtent(false, angle)

  // Create the extrusion.
  const ext = revolves.add(revInput)
}

run();
