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

  // Get sketch lines
  const sketchLines = sketch.sketchCurves.sketchLines

  // Create sketch rectangle
  const startPoint = adsk.core.Point3D.create(0, 0, 0)
  const endPoint = adsk.core.Point3D.create(5.0, 5.0, 0)
  sketchLines.addTwoPointRectangle(startPoint, endPoint)

  // Get two sketch lines
  const sketchLineOne = sketchLines.item(0)
  const sketchLineTwo = sketchLines.item(1)

  // Get the profile
  const prof = sketch.profiles.item(0)

  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  /// Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)

  // Set the distance extent
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Set the extrude type to be solid
  extInput.isSolid = true

  // Create the extrusion
  const ext = extrudes.add(extInput)

  // Create a sketch circle
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(8, 8, 0)
  const sketchCircle = sketchCircles.addByCenterRadius(centerPoint, 3.0)

  // Get the body with the extrude
  const body = ext.bodies.item(0)

  // Get a vertex of the body
  const vertex = body.vertices.item(0)

  // Get three intersect faces
  const faceOne = vertex.faces.item(0)
  const faceTwo = vertex.faces.item(1)
  const faceThree = vertex.faces.item(2)

  // Create perpendicular construction axis
  const axes = rootComp.constructionAxes
  const axisInput = axes.createInput()
  axisInput.setByPerpendicularAtPoint(faceOne, vertex)
  const axis = axes.add(axisInput)

  // Get construction points
  const constructionPoints = rootComp.constructionPoints

  // Create construction point input
  const pointInput = constructionPoints.createInput()

  // Create construction point by two points
  pointInput.setByTwoEdges(sketchLineOne, sketchLineTwo)
  constructionPoints.add(pointInput)
  // Create construction point by three planes
  pointInput.setByThreePlanes(faceOne, faceTwo, faceThree)
  constructionPoints.add(pointInput)

  // Create construction point by edge and plane
  pointInput.setByEdgePlane(axis, faceOne)
  constructionPoints.add(pointInput)

  // Create construction point by center
  pointInput.setByCenter(sketchCircle)
  constructionPoints.add(pointInput)

  // Create construction point by point
  pointInput.setByPoint(vertex)
  const point = constructionPoints.add(pointInput)

  // Get the health state of the construction point
  let message = ""
  const health = point.healthState
  if (health == adsk.fusion.FeatureHealthStates.WarningFeatureHealthState || health == adsk.fusion.FeatureHealthStates.ErrorFeatureHealthState) {
    message = point.errorOrWarningMessage
  }
  adsk.log(message)

}
run();
