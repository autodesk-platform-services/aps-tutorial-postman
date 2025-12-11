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

  // Get the end face of the extrusion
  const endFaces = ext.endFaces
  const endFace = endFaces.item(0)

  // Create a construction plane by offsetting the end face
  const planes = rootComp.constructionPlanes
  const planeInput = planes.createInput()
  const offsetVal = adsk.core.ValueInput.createByString('2 cm')
  planeInput.setByOffset(endFace, offsetVal)
  const offsetPlane = planes.add(planeInput)

  // Create a sketch on the new construction plane and add four sketch points on it
  const offsetSketch = sketches.add(offsetPlane)
  const offsetSketchPoints = offsetSketch.sketchPoints
  const sPt0 = offsetSketchPoints.add(adsk.core.Point3D.create(1, 0, 0))
  const sPt1 = offsetSketchPoints.add(adsk.core.Point3D.create(0, 1, 0))
  const sPt2 = offsetSketchPoints.add(adsk.core.Point3D.create(-1, 0, 0))
  const sPt3 = offsetSketchPoints.add(adsk.core.Point3D.create(0, -1, 0))

  // Add the four sketch points into a collection
  const ptColl = adsk.core.ObjectCollection.create()
  ptColl.add(sPt0)
  ptColl.add(sPt1)
  ptColl.add(sPt2)
  ptColl.add(sPt3)

  // Create a hole input
  const holes = rootComp.features.holeFeatures
  const holeInput = holes.createSimpleInput(adsk.core.ValueInput.createByString('2 mm'))
  holeInput.setPositionBySketchPoints(ptColl)
  holeInput.setDistanceExtent(distance)

  const hole = holes.add(holeInput)
}

run();
