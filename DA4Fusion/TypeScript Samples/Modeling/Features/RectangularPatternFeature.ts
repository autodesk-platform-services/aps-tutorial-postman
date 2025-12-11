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
  sketchCircles.addByCenterRadius(centerPoint, 3.0)

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
  const body = ext.bodies.item(0)

  // Create input entities for rectangular pattern
  const inputEntites = adsk.core.ObjectCollection.create()
  inputEntites.add(body)

  // Get x and y axes for rectangular pattern
  const xAxis = rootComp.xConstructionAxis
  const yAxis = rootComp.yConstructionAxis

  // Quantity and distance
  const quantityOne = adsk.core.ValueInput.createByString('3')
  const distanceOne = adsk.core.ValueInput.createByString('8 cm')
  const quantityTwo = adsk.core.ValueInput.createByString('3')
  const distanceTwo = adsk.core.ValueInput.createByString('8 cm')

  // Create the input for rectangular pattern
  const rectangularPatterns = rootComp.features.rectangularPatternFeatures
  const rectangularPatternInput = rectangularPatterns.createInput(inputEntites, xAxis, quantityOne, distanceOne, adsk.fusion.PatternDistanceType.SpacingPatternDistanceType)

  // Set the data for second direction
  rectangularPatternInput.setDirectionTwo(yAxis, quantityTwo, distanceTwo)

  // Create the rectangular pattern
  const rectangularFeature = rectangularPatterns.add(rectangularPatternInput)
}

run();
