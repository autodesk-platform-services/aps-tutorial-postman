import { adsk } from "@adsk/fas";

function run() {
  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No adsk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  const design = app.activeProduct as adsk.fusion.Design;

  // Set the design type to DirectDesignType (for non-parametric modelling)
  design.designType = adsk.fusion.DesignTypes.DirectDesignType

  // Get the root component of the active design.
  const rootComp = design.rootComponent

  // Create the first component - containing a box
  const occurrences = rootComp.occurrences
  const matrix = adsk.core.Matrix3D.create()
  const firstComponentOccurrence = occurrences.addNewComponent(matrix) as adsk.fusion.Occurrence
  if (!firstComponentOccurrence) throw new Error("firstComponentOccurrence is null");

  // Create sketch
  const sketches0 = firstComponentOccurrence.component.sketches
  const sketch0 = sketches0.add(rootComp.xZConstructionPlane) as adsk.fusion.Sketch

  // Create a rectangle
  const sketchLines0 = sketch0.sketchCurves.sketchLines
  const startPoint0 = adsk.core.Point3D.create(0, 0, 0) as adsk.core.Point3D
  const endPoint0 = adsk.core.Point3D.create(5, 5, 0) as adsk.core.Point3D
  sketchLines0.addTwoPointRectangle(startPoint0, endPoint0)

  // Get the profile defined by the rectangle
  const prof0 = sketch0.profiles.item(0) as adsk.fusion.Profile

  // Create an extrusion input for the profile.
  const features0 = firstComponentOccurrence.component.features
  const extrudes0 = features0.extrudeFeatures
  const extInput0 = extrudes0.createInput(prof0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation) as adsk.fusion.ExtrudeFeatureInput

  // Define that the extent of the extrusion is a distance extent of 5 cm.
  const distance0 = adsk.core.ValueInput.createByReal(5) as adsk.core.ValueInput
  const distanceExtentDef0 = adsk.fusion.DistanceExtentDefinition.create(distance0) as adsk.fusion.DistanceExtentDefinition
  extInput0.setOneSideExtent(distanceExtentDef0, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const ext0 = extrudes0.add(extInput0)

  // Create the second component - containing a box that overlaps the box in the first component
  const secondComponentOccurrence = occurrences.addNewComponent(matrix) as adsk.fusion.Occurrence

  // Create sketch
  const sketches1 = secondComponentOccurrence.component.sketches
  const sketch1 = sketches1.add(rootComp.xZConstructionPlane) as adsk.fusion.Sketch

  // Create a rectangle
  const sketchLines1 = sketch1.sketchCurves.sketchLines
  const startPoint1 = adsk.core.Point3D.create(3, 3, 0) as adsk.core.Point3D
  const endPoint1 = adsk.core.Point3D.create(8, 8, 0) as adsk.core.Point3D
  sketchLines1.addTwoPointRectangle(startPoint1, endPoint1)
  // Get the profile defined by the rectangle
  const prof1 = sketch1.profiles.item(0) as adsk.fusion.Profile

  // Create an extrusion input for the profile.
  const features1 = secondComponentOccurrence.component.features
  const extrudes1 = features1.extrudeFeatures
  const extInput1 = extrudes1.createInput(prof1, adsk.fusion.FeatureOperations.NewBodyFeatureOperation) as adsk.fusion.ExtrudeFeatureInput

  // Define that the extent of the extrusion is a distance extent of 5 cm.
  const distance1 = adsk.core.ValueInput.createByReal(5) as adsk.core.ValueInput
  const distanceExtentDef1 = adsk.fusion.DistanceExtentDefinition.create(distance1) as adsk.fusion.DistanceExtentDefinition
  extInput1.setOneSideExtent(distanceExtentDef1, adsk.fusion.ExtentDirections.PositiveExtentDirection)


  // Create the extrusion.
  const ext1 = extrudes1.add(extInput1)

  // Create the third component - containing a cylinder that overlaps the box in the second component
  const thirdComponentOccurrence = occurrences.addNewComponent(matrix) as adsk.fusion.Occurrence

  // Create sketch
  const sketches2 = thirdComponentOccurrence.component.sketches
  const sketch2 = sketches2.add(rootComp.xZConstructionPlane) as adsk.fusion.Sketch

  // Create a circle
  const sketchCircles2 = sketch2.sketchCurves.sketchCircles
  const centerPoint2 = adsk.core.Point3D.create(8, 8, 0) as adsk.core.Point3D
  sketchCircles2.addByCenterRadius(centerPoint2, 2)

  // Get the profile defined by the circle
  const prof2 = sketch2.profiles.item(0) as adsk.fusion.Profile

  // Create an extrusion input for the profile.
  const features2 = thirdComponentOccurrence.component.features
  const extrudes2 = features2.extrudeFeatures
  const extInput2 = extrudes2.createInput(prof2, adsk.fusion.FeatureOperations.NewBodyFeatureOperation) as adsk.fusion.ExtrudeFeatureInput

  // Define that the extent of the extrusion is a distance extent of 5 cm.
  const distance2 = adsk.core.ValueInput.createByReal(5) as adsk.core.ValueInput
  const distanceExtentDef2 = adsk.fusion.DistanceExtentDefinition.create(distance2) as adsk.fusion.DistanceExtentDefinition
  extInput2.setOneSideExtent(distanceExtentDef2, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const ext2 = extrudes2.add(extInput2)

  // Create a collection of the components to check for interference
  const inputOccurrences = adsk.core.ObjectCollection.create()
  inputOccurrences.add(firstComponentOccurrence)
  inputOccurrences.add(secondComponentOccurrence)
  inputOccurrences.add(thirdComponentOccurrence)

  // Create the interferenceInput object and run the analysis.
  const interferenceInput = design.createInterferenceInput(inputOccurrences) as adsk.fusion.InterferenceInput
  interferenceInput.areCoincidentFacesIncluded = false
  const results = design.analyzeInterference(interferenceInput)

  // Create bodies for every intersection.This is not supported in Parametric designs.
  const interferenceBodies = results.createBodies(true) as adsk.core.ObjectCollection

  // Activate the Intersections component created by Fusion that stores the interference bodies
  const resultsOccurrence = occurrences.item(occurrences.count - 1) as adsk.fusion.Occurrence
  resultsOccurrence.activate()

  // Fit the view
  const viewport = app.activeViewport
  viewport.fit()

  // Report the results
  for (let i = 0; i < results.count; i++) {
    const res = results.item(i) as adsk.fusion.InterferenceResult
    const comp1Name = (res.entityOne as adsk.fusion.BRepBody).parentComponent.name
    const comp2Name = (res.entityTwo as adsk.fusion.BRepBody).parentComponent.name
    const bodyVolume = res.interferenceBody.volume.toFixed(2);
    const body = interferenceBodies.item(i) as adsk.fusion.BRepBody;
    body.name = 'Interference between ' + comp1Name + ' & ' + comp2Name
    adsk.log('There is interference between ' + comp1Name + ' and ' + comp2Name + ' with a volume of ' + bodyVolume + ' cubic centimeters')

  }
}
run();