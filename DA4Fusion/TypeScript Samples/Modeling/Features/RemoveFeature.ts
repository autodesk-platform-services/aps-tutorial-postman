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

   //Get remove features
   const features = rootComp.features
   const removeFeatures = features.removeFeatures

   // Create sketch circle on the xz plane.
   const sketches = rootComp.sketches
   const sketch = sketches.add(rootComp.xZConstructionPlane)
   const sketchCircles = sketch.sketchCurves.sketchCircles
   const centerPoint = adsk.core.Point3D.create(0, 0, 0)
   sketchCircles.addByCenterRadius(centerPoint, 10)

   // Create a collection of entities for extrude
   const entities0 = adsk.core.ObjectCollection.create()
   entities0.add(sketch.profiles.item(0))

   // Create a cylinder with ExtrudeFeature using the profile above.
   const extrudeFeats = features.extrudeFeatures
   const extrudeFeatureInput = extrudeFeats.createInput(entities0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
   extrudeFeatureInput.isSolid = true

   // Define that the extent is a distance extent of 2.5 cm.
   const distance = adsk.core.ValueInput.createByReal(2.5)
   const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
   extrudeFeatureInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
   const extrudeFeature = extrudeFeats.add(extrudeFeatureInput)

   // Get created body
   const body = extrudeFeature.bodies.item(0)

   // Create remove feature
   const removeFeat = removeFeatures.add(body)

   // Create an occurrence
   const occs = rootComp.occurrences
   const occ = occs.addNewComponent(adsk.core.Matrix3D.create())

   // Create remove feature
   const removeFeat2 = removeFeatures.add(occ)
}

run();
