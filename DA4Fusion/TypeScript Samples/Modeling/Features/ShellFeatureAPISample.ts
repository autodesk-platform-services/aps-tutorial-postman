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
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 10)
  
  // Get the profile from the sketch.
  const profile = sketch.profiles.item(0)
  
  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeats = features.extrudeFeatures
  const distance = adsk.core.ValueInput.createByReal(2.5)
  const extrudeFeature = extrudeFeats.addSimple(profile, distance, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  
  // Create a collection of entities for shell
  const entities1 = adsk.core.ObjectCollection.create()
  entities1.add(extrudeFeature.endFaces.item(0))
  
  // Create a shell feature
  const shellFeats = features.shellFeatures
  const isTangentChain = false
  const shellFeatureInput = shellFeats.createInput(entities1, isTangentChain)
  const thickness = adsk.core.ValueInput.createByReal(0.5)
  shellFeatureInput.insideThickness = thickness
  const shellType = adsk.fusion.ShellTypes.SharpOffsetShellType;
  shellFeatureInput.shellType = shellType;
  shellFeats.add(shellFeatureInput)
}

run();
