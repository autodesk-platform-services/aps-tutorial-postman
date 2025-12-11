import { adsk } from "@adsk/fas";

function run() {
  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No adsk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  const design = app.activeProduct as adsk.fusion.Design;
  // Get the root component of the active design.
  const rootComp = design.rootComponent
  // Create four sub components under root component
  const allOccs = rootComp.occurrences

  const transform0 = adsk.core.Matrix3D.create()
  const vector3d0 = adsk.core.Vector3D.create(10.0, 0.0, 0.0)
  transform0.translation = vector3d0
  const subOcc0 = allOccs.addNewComponent(transform0)

  const transform1 = adsk.core.Matrix3D.create()
  const vector3d1 = adsk.core.Vector3D.create(0.0, 0.0, 12.0)
  transform1.translation = vector3d1
  const subOcc1 = allOccs.addNewComponent(transform1)

  const transform2 = adsk.core.Matrix3D.create()
  const vector3d2 = adsk.core.Vector3D.create(-8.0, 0.0, 0.0)
  transform2.translation = vector3d2
  const subOcc2 = allOccs.addNewComponent(transform2)

  const transform3 = adsk.core.Matrix3D.create()
  const vector3d3 = adsk.core.Vector3D.create(0.0, 0.0, -6.0)
  transform3.translation = vector3d3
  const subOcc3 = allOccs.addNewComponent(transform3)

  // Create cylinder 1 in sub component 1
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  const subComp0 = subOcc0.component
  const sketches0 = subComp0.sketches
  const sketch0 = sketches0.add(subComp0.xZConstructionPlane)
  const sketchCircles0 = sketch0.sketchCurves.sketchCircles
  sketchCircles0.addByCenterRadius(centerPoint, 0.5)

  const profile0 = sketch0.profiles.item(0)
  const extrudes0 = subComp0.features.extrudeFeatures
  const extInput0 = extrudes0.createInput(profile0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  const distance0 = adsk.core.ValueInput.createByString("50 mm")
  const distanceExtentDef0 = adsk.fusion.DistanceExtentDefinition.create(distance0)
  extInput0.setOneSideExtent(distanceExtentDef0, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extInput0.isSolid = false
  extrudes0.add(extInput0)

  // Create cylinder 2 in sub component 2
  const subComp1 = subOcc1.component
  const sketches1 = subComp1.sketches
  const sketch1 = sketches1.add(subComp1.xZConstructionPlane)
  const sketchCircles1 = sketch1.sketchCurves.sketchCircles
  sketchCircles1.addByCenterRadius(centerPoint, 0.7)

  const profile1 = sketch1.profiles.item(0)
  const extrudes1 = subComp1.features.extrudeFeatures
  const extInput1 = extrudes1.createInput(profile1, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  const distance1 = adsk.core.ValueInput.createByString("75 mm")
  const distanceExtentDef1 = adsk.fusion.DistanceExtentDefinition.create(distance1)
  extInput1.setOneSideExtent(distanceExtentDef1, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extInput1.isSolid = false
  extrudes1.add(extInput1)

  // Create cylinder 3 in sub component 3
  const subComp2 = subOcc2.component
  const sketches2 = subComp2.sketches
  const sketch2 = sketches2.add(subComp2.xZConstructionPlane)
  const sketchCircles2 = sketch2.sketchCurves.sketchCircles
  sketchCircles2.addByCenterRadius(centerPoint, 1.0)

  const profile2 = sketch2.profiles.item(0)
  const extrudes2 = subComp2.features.extrudeFeatures
  const extInput2 = extrudes2.createInput(profile2, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  const distance2 = adsk.core.ValueInput.createByString("100 mm")
  const distanceExtentDef2 = adsk.fusion.DistanceExtentDefinition.create(distance2)
  extInput2.setOneSideExtent(distanceExtentDef2, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extInput2.isSolid = false
  extrudes2.add(extInput2)

  // Create cylinder 4 in sub component 4
  const subComp3 = subOcc3.component
  const sketches3 = subComp3.sketches
  const sketch3 = sketches3.add(subComp3.xZConstructionPlane)
  const sketchCircles3 = sketch3.sketchCurves.sketchCircles
  sketchCircles3.addByCenterRadius(centerPoint, 1.2)

  const profile3 = sketch3.profiles.item(0)
  const extrudes3 = subComp3.features.extrudeFeatures
  const extInput3 = extrudes3.createInput(profile3, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  const distance3 = adsk.core.ValueInput.createByString("125 mm")
  const distanceExtentDef3 = adsk.fusion.DistanceExtentDefinition.create(distance3)
  extInput3.setOneSideExtent(distanceExtentDef3, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  extrudes3.add(extInput3)

  // Create object collection
  const occs = adsk.core.ObjectCollection.create()
  occs.add(subOcc0)
  occs.add(subOcc1)
  occs.add(subOcc2)
  occs.add(subOcc3)

  // Create a Rigid group
  const isIncludeChildren = true
  const rigidGroups_ = rootComp.rigidGroups
  rigidGroups_.add(occs, isIncludeChildren)
  const camera_ = app.activeViewport.camera
  camera_.isFitView = true
  app.activeViewport.camera = camera_
}

run();
