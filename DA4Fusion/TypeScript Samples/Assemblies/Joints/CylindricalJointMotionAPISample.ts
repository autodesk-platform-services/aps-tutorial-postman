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
  const sketchPts = sketch.sketchPoints
  const point = adsk.core.Point3D.create(1, 0, 1)
  const sketchPt = sketchPts.add(point)
  const sketchLines = sketch.sketchCurves.sketchLines
  const point1 = adsk.core.Point3D.create(1, 0, 2)
  const point2 = adsk.core.Point3D.create(2, 0, 1)
  const point1SketchSpace = sketch.modelToSketchSpace(point1)
  const point2SketchSpace = sketch.modelToSketchSpace(point2)
  const lines = sketchLines.addTwoPointRectangle(point1SketchSpace, point2SketchSpace)

  // Get the profile defined by the circle
  const prof = sketch.profiles.item(0)

  // Create an extrusion input and make sure it's in a new component
  const extrudes = rootComp.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewComponentFeatureOperation)

  // Set the extrusion input
  const distance = adsk.core.ValueInput.createByReal(5)
  extInput.setSymmetricExtent(distance, false)
  extInput.isSolid = true

  // Create the extrusion
  const ext = extrudes.add(extInput)

  // Get the end face of the created extrusion body
  const endFace = ext.endFaces.item(0)

  // Get the occurrence of the new component
  const occ = rootComp.occurrences.item(0)

  // Create a new sketch in the occurrence
  const sketchInOcc = sketches.add(endFace, occ)

  // Get the sketch curve projected to the sketch
  const curve = sketchInOcc.sketchCurves.item(0)

  // Create the first joint geometry with the sketch curve
  const geo0 = adsk.fusion.JointGeometry.createByCurve(curve, adsk.fusion.JointKeyPointTypes.StartKeyPoint)

  // Create the second joint geometry with sketch point
  const geo1 = adsk.fusion.JointGeometry.createByPoint(sketchPt)

  // Create joint input
  const joints = rootComp.joints
  const jointInput = joints.createInput(geo0, geo1)

  const line = curve as adsk.fusion.SketchLine
  const proxyLine = line.createForAssemblyContext(occ)

  // Set the joint input
  jointInput.setAsCylindricalJointMotion(adsk.fusion.JointDirections.CustomJointDirection, proxyLine)

  // Create the joint
  const joint = joints.add(jointInput)
  const cylindricalMotion = joint.jointMotion as adsk.fusion.CylindricalJointMotion
  const rotLimits = cylindricalMotion.rotationLimits
  rotLimits.isRestValueEnabled = true
  rotLimits.restValue = 3.14 / 3
  const slideLimits = cylindricalMotion.slideLimits
  slideLimits.isMinimumValueEnabled = true
  slideLimits.minimumValue = 0.1

  // Unground component from parent
  occ.isGroundToParent = false
}

run();
