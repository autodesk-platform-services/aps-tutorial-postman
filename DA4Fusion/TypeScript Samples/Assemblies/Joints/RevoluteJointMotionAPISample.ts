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

  // Create sketch in root component
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint0 = adsk.core.Point3D.create(0, 0, 0)
  const circle0 = sketchCircles.addByCenterRadius(centerPoint0, 5.0)
  const centerPoint1 = adsk.core.Point3D.create(10, 10, 0)
  const circle1 = sketchCircles.addByCenterRadius(centerPoint1, 5.0)

  // Get the profile defined by the circle
  const prof0 = sketch.profiles.item(0)
  const prof1 = sketch.profiles.item(1)

  // Create an extrusion input and make sure it's in a new component
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof0, adsk.fusion.FeatureOperations.NewComponentFeatureOperation)

  // Set the extrusion input
  const distance = adsk.core.ValueInput.createByReal(5)
  extInput.setSymmetricExtent(distance, false)
  extInput.isSolid = true

  // Create the extrusion
  const ext = extrudes.add(extInput)

  // Get the side face of the created extrusion body
  const sideFace = ext.sideFaces.item(0)

  // Get the occurrence of the new component
  const occ = rootComp.occurrences.item(0)

  // Create the first joint geometry with the side face
  const geo0 = adsk.fusion.JointGeometry.createByNonPlanarFace(sideFace, adsk.fusion.JointKeyPointTypes.StartKeyPoint)

  // Create the second joint geometry with prof1
  const geo1 = adsk.fusion.JointGeometry.createByProfile(prof1, circle1, adsk.fusion.JointKeyPointTypes.CenterKeyPoint)

  // Create joint input
  const joints = rootComp.joints

  const jointInput = joints.createInput(geo0, geo1)

  // Set the joint input
  const angle = adsk.core.ValueInput.createByString('90 deg')
  jointInput.angle = angle
  const offset = adsk.core.ValueInput.createByString('1 cm')
  jointInput.offset = offset
  jointInput.isFlipped = true
  jointInput.setAsRevoluteJointMotion(adsk.fusion.JointDirections.YAxisJointDirection)

  // Create the joint
  const joint = joints.add(jointInput)
  const revoluteMotion = joint.jointMotion as adsk.fusion.RevoluteJointMotion
  const limits = revoluteMotion.rotationLimits
  limits.isMinimumValueEnabled = true
  limits.minimumValue = 3.14 / 3
  limits.isMaximumValueEnabled = true
  limits.maximumValue = 3.14 / 3 * 2

  // Unground component from parent
  occ.isGroundToParent = false
}

run();
