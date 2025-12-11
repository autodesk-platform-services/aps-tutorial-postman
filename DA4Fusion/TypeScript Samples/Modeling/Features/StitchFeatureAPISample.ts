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

  // Create two sketch lines on the xz plane.
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchLines = sketch.sketchCurves.sketchLines
  const startPoint = adsk.core.Point3D.create(0, 0, 0)
  const endPoint = adsk.core.Point3D.create(1, 0, 0)
  const sketchLine = sketchLines.addByTwoPoints(startPoint, endPoint)
  const endPoint2 = adsk.core.Point3D.create(0, 1, 0)
  const sketchLine2 = sketchLines.addByTwoPoints(startPoint, endPoint2)

  // Create surface one with ExtrudeFeature.
  const features = rootComp.features
  const extrudeFeatures = features.extrudeFeatures
  const openProfile = rootComp.createOpenProfile(sketchLine)
  const extrudeFeatureInput = extrudeFeatures.createInput(openProfile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeFeatureInput.isSolid = false

  const distance = adsk.core.ValueInput.createByReal(1.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extrudeFeatureInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  const extrudeFeature = extrudeFeatures.add(extrudeFeatureInput)

  // Create surface two with ExtrudeFeature.
  const openProfile2 = rootComp.createOpenProfile(sketchLine2)
  const extrudeFeatureInput2 = extrudeFeatures.createInput(openProfile2, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeFeatureInput2.isSolid = false

  extrudeFeatureInput2.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  const extrudeFeature2 = extrudeFeatures.add(extrudeFeatureInput2)

  // Get surface bodies and add them to object collection.
  const surface = extrudeFeature.bodies.item(0)
  const surface2 = extrudeFeature2.bodies.item(0)
  const surfaces = adsk.core.ObjectCollection.create()
  surfaces.add(surface)
  surfaces.add(surface2)

  // Define tolerance with 1 cm.
  const tolerance = adsk.core.ValueInput.createByReal(1.0)

  // Create a stitch input to be able to define the input needed for an stitch.
  const stitches = features.stitchFeatures
  const stitchInput = stitches.createInput(surfaces, tolerance, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Create a stitch feature.
  const stitch = stitches.add(stitchInput)

}

run();
