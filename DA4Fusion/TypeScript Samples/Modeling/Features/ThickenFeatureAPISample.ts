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

  // Create surface
  const openProfile = rootComp.createOpenProfile(sketchCircle)
  const features = rootComp.features
  const extrudes = features.extrudeFeatures
  const extrudeInput = extrudes.createInput(openProfile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeInput.isSolid = false
  const distance = adsk.core.ValueInput.createByReal(3.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extrudeInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  const extrude = extrudes.add(extrudeInput)

  // Create thicken feature
  const thickenFeatures = features.thickenFeatures
  const inputSurfaces = adsk.core.ObjectCollection.create()
  const bodies = extrude.bodies

  for (let i=0; i < bodies.count; i++) {
    inputSurfaces.add(bodies.item(i))
  }
  const thickness = adsk.core.ValueInput.createByReal(1.0)
  const thickenInput = thickenFeatures.createInput(inputSurfaces, thickness, false,  adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  thickenFeatures.add(thickenInput)
}

run();
