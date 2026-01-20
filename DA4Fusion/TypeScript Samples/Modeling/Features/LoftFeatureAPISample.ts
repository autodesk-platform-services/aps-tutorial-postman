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

  // Create profile 1
  const sketchesObj = rootComp.sketches
  const sketch0 = sketchesObj.add(rootComp.xZConstructionPlane)
  const sketchCirclesObj0 = sketch0.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCirclesObj0.addByCenterRadius(centerPoint, 5.0)
  const profile0 = sketch0.profiles.item(0)
  
  // Create profile 2
  const ctorPlanes = rootComp.constructionPlanes
  const ctorPlaneInput1 = ctorPlanes.createInput()
  const offset = adsk.core.ValueInput.createByString("10 cm")
  ctorPlaneInput1.setByOffset(rootComp.xZConstructionPlane, offset)
  const ctorPlane1 = ctorPlanes.add(ctorPlaneInput1)
  const sketch1 = sketchesObj.add(ctorPlane1)
  const sketchCirclesObj1 = sketch1.sketchCurves.sketchCircles
  sketchCirclesObj1.addByCenterRadius(centerPoint, 2.0)
  const profile1 = sketch1.profiles.item(0)
  
  // Create profile 3
  const ctorPlaneInput2 = ctorPlanes.createInput()
  ctorPlaneInput2.setByOffset(ctorPlane1, offset)
  const ctorPlane2 = ctorPlanes.add(ctorPlaneInput2)
  const sketch2 = sketchesObj.add(ctorPlane2)
  const sketchCirclesObj2 = sketch2.sketchCurves.sketchCircles
  sketchCirclesObj2.addByCenterRadius(centerPoint, 10.0)
  const profile2 = sketch2.profiles.item(0)
  
  // Create loft feature input
  const loftFeats = rootComp.features.loftFeatures
  const loftInput = loftFeats.createInput(adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  const loftSectionsObj = loftInput.loftSections
  loftSectionsObj.add(profile0)
  loftSectionsObj.add(profile1)
  loftSectionsObj.add(profile2)
  loftInput.isSolid = false
  loftInput.isClosed = false
  loftInput.isTangentEdgesMerged = true
  loftInput.startLoftEdgeAlignment = adsk.fusion.LoftEdgeAlignments.FreeEdgesLoftEdgeAlignment
  loftInput.endLoftEdgeAlignment = adsk.fusion.LoftEdgeAlignments.FreeEdgesLoftEdgeAlignment
  
  // Create loft feature
  loftFeats.add(loftInput)
}

run();
