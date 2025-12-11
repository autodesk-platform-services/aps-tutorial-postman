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

  const allOccs = rootComp.occurrences
  const transform = adsk.core.Matrix3D.create()

  // Create a component under root component
  const occ1 = allOccs.addNewComponent(transform)
  const subComp1 = occ1.component
  adsk.log(subComp1.revisionId)

  // Create a sketch in sub component 1
  const sketches1 = subComp1.sketches
  const sketch1 = sketches1.add(rootComp.yZConstructionPlane)
  adsk.log(subComp1.revisionId)

  // Get sketch lines
  const sketchLines = sketch1.sketchCurves.sketchLines
  // Create sketch rectangle
  const startPoint = adsk.core.Point3D.create(-8.0, 0, 0)
  const endPoint = adsk.core.Point3D.create(8.0, 8.0, 0)
  sketchLines.addTwoPointRectangle(startPoint, endPoint)
  adsk.log(subComp1.revisionId)

  // Get the profile of the first sketch
  const prof1 = sketch1.profiles.item(0)

  // Create an extrusion input
  const extrudes1 = subComp1.features.extrudeFeatures
  const extInput1 = extrudes1.createInput(prof1, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 2 cm
  const distance1 = adsk.core.ValueInput.createByReal(2.0)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance1)
  extInput1.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Set the extrude type to be solid
  extInput1.isSolid = true
  // Create the extrusion
  const ext1 = extrudes1.add(extInput1)
  adsk.log(subComp1.revisionId)

  // Create a second occurrence
  const transform2 = adsk.core.Matrix3D.create()
  const translation = adsk.core.Vector3D.create(10, 0, 0)
  transform2.translation = translation
  const occ2 = allOccs.addExistingComponent(subComp1, transform2)

  // Ground to parent
  occ1.isGroundToParent = false
  occ2.isGroundToParent = true
}

run();