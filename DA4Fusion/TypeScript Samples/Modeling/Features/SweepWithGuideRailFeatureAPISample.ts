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

   // Create sketch for the profile to sweep
   const sketches = rootComp.sketches
   const sketch = sketches.add(rootComp.xZConstructionPlane)
   const sketchCircles = sketch.sketchCurves.sketchCircles
   const centerPoint = adsk.core.Point3D.create(0, 0, 0)
   const circle = sketchCircles.addByCenterRadius(centerPoint, 1.0)

   // Get the profile defined by the circle.
   const prof = sketch.profiles.item(0)

   // Create a vertical sketch and add a spline (for the sweep path) and a line (for the sweep guide rail)
   const sketchVertical = sketches.add(rootComp.yZConstructionPlane)
   const sketchSplines = sketchVertical.sketchCurves.sketchFittedSplines
   const sketchLines = sketchVertical.sketchCurves.sketchLines

   // Create points for the spline definition
   const splineStartPt = adsk.core.Point3D.create(0, 0, 0)
   const splineMidPt = adsk.core.Point3D.create(0, 5, 0)
   const splineEndPt = adsk.core.Point3D.create(3, 10, 0)

   // Create a collection of the points for the input needed to create the spline
   const fitPoints = adsk.core.ObjectCollection.create()
   fitPoints.add(splineStartPt)
   fitPoints.add(splineMidPt)
   fitPoints.add(splineEndPt)

   // Create the spline
   const spline = sketchSplines.add(fitPoints)

   // Create points for the line definition
   const lineStartPt = adsk.core.Point3D.create(-2, 0, 0)
   const lineEndPt = adsk.core.Point3D.create(-2, 10, 0)

   // Create the line
   const line = sketchLines.addByTwoPoints(lineStartPt, lineEndPt)

   // Create a path for the sweep path and guide rail
   const path = rootComp.features.createPath(spline)
   const guide = rootComp.features.createPath(line)

   // Create a sweep input
   const sweeps = rootComp.features.sweepFeatures
   const sweepInput = sweeps.createInput(prof, path, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
   sweepInput.guideRail = guide
   sweepInput.profileScaling = adsk.fusion.SweepProfileScalingOptions.SweepProfileScaleOption

   // Create the sweep.
   const sweep = sweeps.add(sweepInput)

   sketchVertical.isVisible = true
}

run();
