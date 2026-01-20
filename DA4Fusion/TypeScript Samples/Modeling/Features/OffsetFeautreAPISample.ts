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

  // Define that the extent is a distance extent of 3 cm.
  const distance1 = adsk.core.ValueInput.createByReal(3.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance1)
  extrudeInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const extrude = extrudes.add(extrudeInput)

  // Get the body created by extrusion
  const body = extrude.bodies.item(0)

  // Create input entities for offset feature
  const inputEntities = adsk.core.ObjectCollection.create()
  inputEntities.add(body)

  // Distance for offset feature
  const distance2 = adsk.core.ValueInput.createByString('1 cm')

  // Create an input for offset feature
  const offsetFeatures = features.offsetFeatures
  const offsetInput = offsetFeatures.createInput(inputEntities, distance2, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Create the offset feature
  offsetFeatures.add(offsetInput);
}

run();
