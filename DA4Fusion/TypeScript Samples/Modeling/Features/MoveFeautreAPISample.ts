/**
 * Hello Fusion
 * Design Automation for Fusion's 'Hello World' sample
 * @returns {object} The parameters passed with the script.
 */

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
  const centerPoint1 = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint1, 10)
  const centerPoint2 = adsk.core.Point3D.create(15, 5, 0)
  sketchCircles.addByCenterRadius(centerPoint2, 4)
  
  // Create a collection of entities for extrude
  const profiles = adsk.core.ObjectCollection.create()
  profiles.add(sketch.profiles.item(0))
  profiles.add(sketch.profiles.item(1))
  
  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeats = features.extrudeFeatures
  const extrudeFeature = extrudeFeats.addSimple(profiles, adsk.core.ValueInput.createByReal(2.0), adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  
  // Create a collection of entities for move
  const bodies = adsk.core.ObjectCollection.create()
  bodies.add(extrudeFeature.bodies.item(0))
  
  // Create a transform to do move
  const vector = adsk.core.Vector3D.create(0.0, 10.0, 0.0)
  const transform = adsk.core.Matrix3D.create()
  transform.translation = vector
  // Create a move feature
  const moveFeats = features.moveFeatures
  const moveFeatureInput = moveFeats.createInput2(bodies)
  moveFeatureInput.defineAsFreeMove(transform)
  moveFeats.add(moveFeatureInput)

}

run();
