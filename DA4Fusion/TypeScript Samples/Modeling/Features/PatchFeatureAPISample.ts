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

  // Create sketch
  const sketchesObj = rootComp.sketches
  const sketch = sketchesObj.add(rootComp.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 3.0)
  sketchCircles.addByCenterRadius(centerPoint, 10.0)
  // Get the profiles defined by the circles.
  const profile1 = sketch.profiles.item(0)
  const profile2 = sketch.profiles.item(1)

  // Get the inner and outer profile
  const areaPropertiesOfProfile1 = profile1.areaProperties()
  const areaPropertiesOfProfile2 = profile2.areaProperties()
  const areaOfProfile1 = areaPropertiesOfProfile1.area
  const areaOfProfile2 = areaPropertiesOfProfile2.area
  let outerProfile = profile1
  if (areaOfProfile1 < areaOfProfile2) {
      outerProfile = profile2}
  
  // Create a extrusion based on the outer profile
  const extrudes = rootComp.features.extrudeFeatures
  const extrudeDistance = adsk.core.ValueInput.createByString("1 cm")
  const extrudeFeature = extrudes.addSimple(outerProfile, extrudeDistance, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  
  // Get BrepEdge from inner loop on the end face of the extrusion
  const  extrudeEndFace = extrudeFeature.endFaces.item(0)
  const brepLoops = extrudeEndFace.loops
  const innerLoop = brepLoops.item(0)
  if (innerLoop.isOuter){
      const innerLoop = brepLoops.item(1)}
  const brepEdges = innerLoop.edges
  const brepEdge = brepEdges.item(0)
  // Create the patch feature
  const patches = rootComp.features.patchFeatures
  const patchInput = patches.createInput(brepEdge, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  patches.add(patchInput)

}

run();
