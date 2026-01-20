/**
 * Hello Fusion
 * Fusion Automation Service's 'Hello World' sample
 * @returns {object} The parameters passed with the script.
 */

import { adsk } from '@adsk/fas'

function run() {

  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
  const design = app.activeProduct as adsk.fusion.Design

  // Get the root component of the active design.
  const rootComp = design.rootComponent

  // Have the edge selected and add it to an ObjectCollection.
  const body = createBox(rootComp, 4, 4)
  const edge = body.edges.item(0)

  const edgeCollection = adsk.core.ObjectCollection.create()
  edgeCollection.add(edge)

  // Create the FilletInput object.
  const fillets = rootComp.features.filletFeatures
  const filletInput = fillets.createInput()
  filletInput.edgeSetInputs.addConstantRadiusEdgeSet(edgeCollection, adsk.core.ValueInput.createByString('.25 in'), true)

  // Create the fillet.
  const fillet = fillets.add(filletInput)
}

function createBox(rootComp: adsk.fusion.Component, sizeX: number, sizeY: number): adsk.fusion.BRepBody{
// Create sketch
const sketches = rootComp.sketches
const sketch = sketches.add(rootComp.xZConstructionPlane)
const sketchCircles = sketch.sketchCurves.sketchCircles
const lines = sketch.sketchCurves.sketchLines
lines.addTwoPointRectangle(adsk.core.Point3D.create(0, 0, 0), adsk.core.Point3D.create(sizeX, sizeY, 0))

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
return ext.bodies.item(0)
}

run();
