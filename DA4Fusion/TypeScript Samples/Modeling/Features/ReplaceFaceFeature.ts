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
  const features = rootComp.features

  // Create sketch circle on the xz plane.
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 10)

  // Get the profile from the sketch.
  const profile = sketch.profiles.item(0)
  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeats = features.extrudeFeatures
  const distance = adsk.core.ValueInput.createByReal(2.5)
  const extrudeFeature = extrudeFeats.addSimple(profile, distance, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Create a collection of source faces for replace
  const entities1 = adsk.core.ObjectCollection.create()
  const sourceFace = extrudeFeature.endFaces.item(0)
  entities1.add(sourceFace)
  // Create a construction plane as the target face
  const offset = adsk.core.ValueInput.createByReal(5)
  const ctorPlanes = rootComp.constructionPlanes
  const ctorPlaneInput = ctorPlanes.createInput()
  ctorPlaneInput.setByOffset(sourceFace, offset)
  const ctorPlane = ctorPlanes.add(ctorPlaneInput)
  // Create a replace feature
  const replaceFaceFeas = features.replaceFaceFeatures
  const isTangentChain = false
  const replaceFaceInput = replaceFaceFeas.createInput(entities1, isTangentChain, ctorPlane)
  replaceFaceFeas.add(replaceFaceInput)
}

run();
