import { adsk } from "@adsk/fas";

function run() {
  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  // Create a document.
  const design = app.activeProduct as adsk.fusion.Design
  design.designType = adsk.fusion.DesignTypes.DirectDesignType

  // Get the root component of the active design.
  const rootComp = design.rootComponent
  const features = rootComp.features

  // Create sketch circle on the xz plane.
  const sketches = rootComp.sketches
  const sketch1 = sketches.add(rootComp.xZConstructionPlane)
  const sketchCircles1 = sketch1.sketchCurves.sketchCircles
  const centerPoint1 = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles1.addByCenterRadius(centerPoint1, 10)

  // Create a collection of entities for extrude
  const entities0 = adsk.core.ObjectCollection.create()
  entities0.add(sketch1.profiles.item(0))

  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeats = features.extrudeFeatures
  const extrudeFeatureInput1 = extrudeFeats.createInput(entities0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeFeatureInput1.isSolid = true

  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(adsk.core.ValueInput.createByReal(2.5))
  extrudeFeatureInput1.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extrudeFeats.add(extrudeFeatureInput1)

  // Create second body to do interference
  const sketch2 = sketches.add(rootComp.xZConstructionPlane)
  const sketchCircles2 = sketch2.sketchCurves.sketchCircles
  const centerPoint2 = adsk.core.Point3D.create(5, 0, 0)
  sketchCircles2.addByCenterRadius(centerPoint2, 10)
  entities0.clear()
  entities0.add(sketch2.profiles.item(0))
  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeatureInput2 = extrudeFeats.createInput(entities0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeFeatureInput2.isSolid = true
  extrudeFeatureInput2.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extrudeFeats.add(extrudeFeatureInput2)

  // Create a collection of bodies
  const bodies = adsk.core.ObjectCollection.create()
  for (let i = 0; i < rootComp.bRepBodies.count; i++) {
    const body = rootComp.bRepBodies.item(i)
    bodies.add(body)
  }
  // Create InterferenceInput
  const input = design.createInterferenceInput(bodies)
  // Analyze interference
  const results = design.analyzeInterference(input)
  // Create bodies
  results.createBodies(true)

}

run();
