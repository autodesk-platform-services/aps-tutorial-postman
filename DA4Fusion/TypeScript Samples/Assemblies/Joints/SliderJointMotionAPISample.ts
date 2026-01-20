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
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  const circle = sketchCircles.addByCenterRadius(centerPoint, 5.0)

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
  const geo0 = adsk.fusion.JointGeometry.createByCurve(curve, adsk.fusion.JointKeyPointTypes.CenterKeyPoint)

  // Create the second joint geometry with sketch point
  const geo1 = adsk.fusion.JointGeometry.createByPoint(sketchPt)

  // Create joint input
  const joints = rootComp.joints
  const jointInput = joints.createInput(geo0, geo1)

  // Set the joint input
  jointInput.setAsSliderJointMotion(adsk.fusion.JointDirections.ZAxisJointDirection)

  // Create the joint
  const joint = joints.add(jointInput)
  const sliderMotion = joint.jointMotion as adsk.fusion.SliderJointMotion
  const limits = sliderMotion.slideLimits
  limits.isRestValueEnabled = true
  limits.restValue = 1.0

  // Create ContactSets
  const mat = adsk.core.Matrix3D.create()
  mat.translation = adsk.core.Vector3D.create(0, 10, 0)
  rootComp.occurrences.addExistingComponent(ext.parentComponent, mat)

  design.isContactAnalysisEnabled = true
  design.isContactSetAnalysis = true

  const contacts = design.contactSets
  const occurrencesAndBodies = []

  const occ0 = rootComp.occurrences.item(0)
  const occ1 = rootComp.occurrences.item(1)

  // Unground components from their parents
  occ0.isGroundToParent = false
  occ1.isGroundToParent = false

  occurrencesAndBodies.push(occ0)
  occurrencesAndBodies.push(occ1)

  contacts.add(occurrencesAndBodies)
}

run();
