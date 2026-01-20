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
  const centerPoint = adsk.core.Point3D.create(10, 0, 0)
  const circle = sketchCircles.addByCenterRadius(centerPoint, 3.0)

  // Get the profile defined by the circle.
  const prof = sketch.profiles.item(0)

  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm.
  const distance = adsk.core.ValueInput.createByReal(5)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)

  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const ext = extrudes.add(extInput)

  // Get the body created by extrusion
  const body = rootComp.bRepBodies.item(0)

  // Create input entities for circular pattern
  const inputEntites = adsk.core.ObjectCollection.create()
  inputEntites.add(body)

  // Get Y axis for circular pattern
  const yAxis = rootComp.yConstructionAxis

  // Create the input for circular pattern
  const circularFeats = rootComp.features.circularPatternFeatures
  const circularFeatInput = circularFeats.createInput(inputEntites, yAxis)

  // Set the quantity of the elements
  circularFeatInput.quantity = adsk.core.ValueInput.createByReal(5)

  // Set the angle of the circular pattern
  circularFeatInput.totalAngle = adsk.core.ValueInput.createByString('180 deg')

  // Set symmetry of the circular pattern
  circularFeatInput.isSymmetric = false

  // Create the circular pattern
  const circularFeat = circularFeats.add(circularFeatInput)
}

run();
