/**
 * Hello Fusion
 * Fusion Automation Service's 'Hello World' sample
 * @returns {object} The parameters passed with the script.
 */

import {adsk} from '@adsk/fas'

function run() {

  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
  const design = app.activeProduct as adsk.fusion.Design

  // Get the root component of the active design.
  const rootComp = design.rootComponent

  // Create sketch
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 5.0)

  // Get the profile defined by the circle
  const prof = sketch.profiles.item(0)
  // Create an extrusion input

  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)

  // Set the distance extent
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

    // Create the extrusion
  const extrudeFeature = extrudes.add(extInput)

  // Get end faces
  const endFacesObj = extrudeFeature.endFaces
  const endFace = endFacesObj.item(0)

  // Create SurfaceDeleteFaceFeature
  const surfaceDeleteFaceFeas = rootComp.features.surfaceDeleteFaceFeatures
  surfaceDeleteFaceFeas.add(endFace)

}

run();
