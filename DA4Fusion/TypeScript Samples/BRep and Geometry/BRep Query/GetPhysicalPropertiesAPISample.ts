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

  // Create sub occurrence
  const occurrences = rootComp.occurrences
  const subOcc = occurrences.addNewComponent(adsk.core.Matrix3D.create())

  // Get features from sub component
  const subComponent = subOcc.component
  const features = subComponent.features

  // Create sketch circle on the xz plane.
  const sketches = subComponent.sketches
  const sketch = sketches.add(subComponent.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  sketchCircles.addByCenterRadius(centerPoint, 10)

  // Create a collection of entities for extrude
  const entities0 = adsk.core.ObjectCollection.create()
  entities0.add(sketch.profiles.item(0))

  // Create a cylinder with ExtrudeFeature using the profile above.
  const extrudeFeats = features.extrudeFeatures
  const extrudeFeatureInput = extrudeFeats.createInput(entities0, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  extrudeFeatureInput.isSolid = true

  // Define that the extent is a distance extent of 2.5 cm
  const distance = adsk.core.ValueInput.createByReal(2.5)

  // Set the distance extent
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extrudeFeatureInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  const extrudeFeature = extrudeFeats.add(extrudeFeatureInput)

  // Get physical properties from body
  const body: adsk.fusion.BRepBody = extrudeFeature.bodies.item(0)
  let physicalProperties = body.physicalProperties

  // Get physical properties from occurrence
  physicalProperties = subOcc.physicalProperties

  // Get physical properties from occurrence(low accuracy)
  physicalProperties = subOcc.getPhysicalProperties(adsk.fusion.CalculationAccuracy.LowCalculationAccuracy)

  // Get physical properties from occurrence(medium accuracy)
  physicalProperties = subOcc.getPhysicalProperties(adsk.fusion.CalculationAccuracy.MediumCalculationAccuracy)

  // Get physical properties from occurrence(high accuracy)
  physicalProperties = subOcc.getPhysicalProperties(adsk.fusion.CalculationAccuracy.HighCalculationAccuracy)

  // Get physical properties from occurrence(very high accuracy)
  physicalProperties = subOcc.getPhysicalProperties(adsk.fusion.CalculationAccuracy.VeryHighCalculationAccuracy)

  // Get physical properties from component
  physicalProperties = subComponent.physicalProperties

  // Get physical properties from component(low accuracy)

  physicalProperties = subComponent.getPhysicalProperties(adsk.fusion.CalculationAccuracy.LowCalculationAccuracy)

  //Get physical properties from component(medium accuracy)
  physicalProperties = subComponent.getPhysicalProperties(adsk.fusion.CalculationAccuracy.MediumCalculationAccuracy)

  //Get physical properties from component(high accuracy)
  physicalProperties = subComponent.getPhysicalProperties(adsk.fusion.CalculationAccuracy.HighCalculationAccuracy)

  // Get physical properties from component(very high accuracy)
  physicalProperties = subComponent.getPhysicalProperties(adsk.fusion.CalculationAccuracy.VeryHighCalculationAccuracy)

  // Get data from physical properties
  const area = physicalProperties.area
  const density = physicalProperties.density
  const mass = physicalProperties.mass
  const volume = physicalProperties.volume

  // Get accuracy from physical properties
  const accuracy = physicalProperties.accuracy

  // Get center of mass from physical properties
  const cog = physicalProperties.centerOfMass

  // Get principal axes from physical properties
  const [xAxis, yAxis, zAxis] = physicalProperties.getPrincipalAxes()

  // Get the moments of inertia about the principal axes. Unit for returned values is kg/cm^2.
  const [i1, i2, i3] = physicalProperties.getPrincipalMomentsOfInertia()

  // Get the radius of gyration about the principal axes.Unit for returned values is cm.
  const [kx, ky, kz] = physicalProperties.getRadiusOfGyration()

  // Get the rotation from the world coordinate system of the target to the principal coordinate system.
  const [rx, ry, rz] = physicalProperties.getRotationToPrincipal()

  // Get the moment of inertia about the world coordinate system.
  const [xx, yy, zz, xy, yz, xz] = physicalProperties.getXYZMomentsOfInertia()
}

run();
