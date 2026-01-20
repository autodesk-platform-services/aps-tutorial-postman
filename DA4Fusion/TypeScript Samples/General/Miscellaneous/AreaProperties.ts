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

  // Create sketch
  const sketches = rootComp.sketches
  const sketch = sketches.add(rootComp.xZConstructionPlane)

  // Create sketch circle
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 5.0)
  const centerPointTwo = adsk.core.Point3D.create(15, 0, 0)
  sketchCircles.addByCenterRadius(centerPointTwo, 5.0)

  // Get the profiles defined by the circle
  const prof = sketch.profiles.item(0)
  const profTwo = sketch.profiles.item(1)

  // Get area properties from a profile
  let areaProps = prof.areaProperties(adsk.fusion.CalculationAccuracy.MediumCalculationAccuracy)

  // Get area
  const area = areaProps.area

  // Get centroid
  const centroid = areaProps.centroid

  // Get perimeter
  const perimeter = areaProps.perimeter

  // Get angle of rotation of the principal axes
  const rotationOfPrincipal = areaProps.rotationToPrincipal

  // Accuracy
  const accuracy = areaProps.accuracy

  // Get area properties from two profiles
  const inputs = adsk.core.ObjectCollection.create()
  inputs.add(prof)
  inputs.add(profTwo)
  areaProps = design.areaProperties(inputs)

  // Get principal axes
  const [xAxis, yAxis] = areaProps.getPrincipalAxes()

  // Get centroid moments of inertia
  const [centixx, centiyy, centizz, centixy, centiyz, centixz] = areaProps.getCentroidMomentsOfInertia()

  // Get principal moments of inertia
  const [i1, i2, i3] = areaProps.getPrincipalMomentsOfInertia()

  // Get radius of gyration
  const [kxx, kyy, kzz] = areaProps.getRadiusOfGyration()

  // Get moments of inertia
  const [ixx, iyy, izz, ixy, iyz, ixz] = areaProps.getMomentsOfInertia()
}

run();
