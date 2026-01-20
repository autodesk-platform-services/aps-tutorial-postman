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
   const distance = adsk.core.ValueInput.createByReal(5.0)
   extInput.setSymmetricExtent(distance, true)
   // Create the extrusion
   const ext = extrudes.add(extInput)
   // Get the body created by the extrusion
   const body = ext.bodies.item(0)

   // Create SplitBodyFeatureInput
   const splitBodyFeats = rootComp.features.splitBodyFeatures
   const splitBodyInput = splitBodyFeats.createInput(body, rootComp.xZConstructionPlane, true)

   // Create split body feature
   splitBodyFeats.add(splitBodyInput)
}

run();
