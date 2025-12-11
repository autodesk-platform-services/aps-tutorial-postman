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

   // Create a sketch that has a rectangle in it
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchLines = sketch.sketchCurves.sketchLines
  const point0 = adsk.core.Point3D.create(0, 0, 0)
  const point1 = adsk.core.Point3D.create(10, 10, 0)
  sketchLines.addTwoPointRectangle(point0, point1)

  // Get the profile defined by the rectangle
  const prof = sketch.profiles.item(0)
  // Create an extrusion input
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(5)
  extInput.setSymmetricExtent(distance, false)

  // Create the extrusion
  const ext = extrudes.add(extInput)
  // Get one edge of the extrusion body
  const face = ext.endFaces.item(0)
  const edge = face.edges.item(0)

  // Create a slant construction plane with an angle of 45 deg on txZConstructionPlane
  const planeInput = rootComp.constructionPlanes.createInput()
  planeInput.setByAngle(edge, adsk.core.ValueInput.createByString('45 deg'), rootComp.xZConstructionPlane)
  const plane = rootComp.constructionPlanes.add(planeInput)

  // Create another sketch containing a circle profile on the slant plane
  const toolSketch = sketches.add(plane)
  const point3 = adsk.core.Point3D.create(-5, 3.5, 0)
  const sketchCircles = toolSketch.sketchCurves.sketchCircles
  const circle = sketchCircles.addByCenterRadius(point3, 3)

  // Get SplitFaceFetures
  const splitFaceFeats = rootComp.features.splitFaceFeatures

  // Set faces to split
  const facesCol = adsk.core.ObjectCollection.create()
  facesCol.add(face)

  // Create a split face feature of surface intersection split type
  const splitFaceInput = splitFaceFeats.createInput(facesCol, circle, true)
  const split1 = splitFaceFeats.add(splitFaceInput)
  split1.deleteMe()

  // Create another split face feature of closest point split type
  splitFaceInput.setClosestPointSplitType()
  const split2 = splitFaceFeats.add(splitFaceInput)
  split2.deleteMe()

  // Create another split face feature of along vector split type
  splitFaceInput.setAlongVectorSplitType(face.edges.item(1))
  splitFaceFeats.add(splitFaceInput)
  }
run();
