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
  const circle = sketchCircles.addByCenterRadius(centerPoint, 3.0)

  // Get the profile defined by the circle.
  const prof = sketch.profiles.item(0)

  // Create a vertical sketch and add two lines on it
  const sketchVertical = sketches.add(rootComp.yZConstructionPlane)
  const sketchLines = sketchVertical.sketchCurves.sketchLines
  const startPt = adsk.core.Point3D.create(0, 0, 0)
  const midPt = adsk.core.Point3D.create(0, 3, 0)
  const endPt = adsk.core.Point3D.create(2, 6, 0)
  const line1 = sketchLines.addByTwoPoints(startPt, midPt)
  const line2 = sketchLines.addByTwoPoints(midPt, endPt)

  // Merge the two lines
  line1.endSketchPoint.merge(line2.startSketchPoint)

  // Create a path and let it find connected curves automatically
  const path = rootComp.features.createPath(line1)
  // Create a sweep input
  const sweeps = rootComp.features.sweepFeatures
  const sweepInput = sweeps.createInput(prof, path, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  sweepInput.taperAngle = adsk.core.ValueInput.createByString('5 deg')
  sweepInput.twistAngle = adsk.core.ValueInput.createByString('10 deg')
  // Create the sweep.
  const sweep = sweeps.add(sweepInput)

  // Get taperAngel and twistAngle from sweep feature
  const taperAngle = sweep.taperAngle
  const twistAngle = sweep.twistAngle
  adsk.log(`taper angle: ${taperAngle.expression}`)
  adsk.log(`twist angle: ${twistAngle.expression}`)
}

run();
