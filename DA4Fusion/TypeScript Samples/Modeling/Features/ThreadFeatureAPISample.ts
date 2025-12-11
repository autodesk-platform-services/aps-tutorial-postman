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

  // create a new sketch on the xy plane.
  const sketch = rootComp.sketches.add(rootComp.xYConstructionPlane)

  // create a sketch circle
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const sketchCircle = sketchCircles.addByCenterRadius(adsk.core.Point3D.create(0, 0, 0), 3)

  // get the profile defined by the circle.
  const prof = sketch.profiles.item(0)

  // create extrude input
  const extrudes = rootComp.features.extrudeFeatures
  const extrudeInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // define that the extent is a distance extent of 7 cm
  const distance = adsk.core.ValueInput.createByReal(7.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extrudeInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // extrude the circle to create a cylinder
  const extrude = extrudes.add(extrudeInput)

  // define all of the thread information.
  const threadFeatures = rootComp.features.threadFeatures

  // query the thread table to get the thread information
  const threadDataQuery = threadFeatures.threadDataQuery
  const threadTypes = threadDataQuery.allThreadTypes
  const threadType = threadTypes[0]

  const allsizes = threadDataQuery.allSizes(threadType)
  const threadSize = allsizes[0]

  const allDesignations = threadDataQuery.allDesignations(threadType, threadSize)
  const threadDesignation = allDesignations[0]

  const allClasses = threadDataQuery.allClasses(false, threadType, threadDesignation)
  const threadClass = allClasses[0]

  // create the threadInfo according to the query result
  const threadInfo = threadFeatures.createThreadInfo(false, threadType, threadDesignation, threadClass)

  // get the face the thread will be applied to
  const sideface = extrude.sideFaces.item(0)
  const faces = adsk.core.ObjectCollection.create()
  faces.add(sideface)

  // define the thread input with the lenght 3.5 cm
  const threadInput = threadFeatures.createInput(faces, threadInfo)
  threadInput.isFullLength = false
  threadInput.threadLength = adsk.core.ValueInput.createByReal(3.5)

  // create the final thread
  const thread = threadFeatures.add(threadInput)
}

run();
