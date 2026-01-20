import { adsk } from "@adsk/fas";

function getArcGeometryInfo(arcGeom) {
  const result = arcGeom.getData()
  if (result[0]) {
    const [retVal, center, axis, refVector, radius, startAngle, endAngle] = result

    let arcInfo = ""
    arcInfo += `Center: ${center.x.toFixed(6)}, ${center.y.toFixed(6)}, ${center.z.toFixed(6)}\n`;
    arcInfo += `Axis: ${axis.x.toFixed(6)}, ${axis.y.toFixed(6)}, ${axis.z.toFixed(6)}\n`;
    arcInfo += `Reference vector: ${refVector.x.toFixed(6)}, ${refVector.y.toFixed(6)}, ${refVector.z.toFixed(6)}\n`;
    arcInfo += `Radius: ${radius.toFixed(6)}\n`;
    arcInfo += `Start angle: ${startAngle.toFixed(6)}\n`;
    arcInfo += `End angle: ${endAngle.toFixed(6)}`;
    return arcInfo
  }

}
function getCircleGeometryInfo(circGeom) {
  const result = circGeom.getData()

  if (result[0]) {
    const [retVal, center, axis, radius] = result

    let circleInfo = "";
    circleInfo += `Center: ${center.x.toFixed(6)}, ${center.y.toFixed(6)}, ${center.z.toFixed(6)}\n`;
    circleInfo += `Axis: ${axis.x.toFixed(6)}, ${axis.y.toFixed(6)}, ${axis.z.toFixed(6)}\n`;
    circleInfo += `Radius: ${radius.toFixed(6)}`;
    return circleInfo
  }
}

function createCylinder(component: adsk.fusion.Component) {
  // Create sketch
  const sketches = component.sketches
  const sketch = sketches.add(component.xZConstructionPlane)
  const sketchCircles = sketch.sketchCurves.sketchCircles
  const centerPoint = adsk.core.Point3D.create(0, 0, 0)
  const circle = sketchCircles.addByCenterRadius(centerPoint, 3.0)

  // Get the profile defined by the circle.
  const prof = sketch.profiles.item(0)

  // Create an extrusion input
  const extrudes = component.features.extrudeFeatures
  const extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

  // Define that the extent is a distance extent of 5 cm.
  const distance = adsk.core.ValueInput.createByReal(5)
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)

  // Create the extrusion.
  const ext = extrudes.add(extInput)

  return ext.bodies.item(0)
}

function run() {
  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  // Create a document.
  const design = app.activeProduct as adsk.fusion.Design
  if (!design) throw Error("No active Fusion design");

  const rootComp = design.rootComponent

  const cylinder = createCylinder(rootComp)

  // Selecting circular edge
  const edge = cylinder.edges.item(1)
  adsk.log("TypeScript")
  adsk.log("Edge object type: " + edge.geometry.objectType)
  adsk.log("Arc object type: " + adsk.core.Arc3D.classType())
  adsk.log("Circle object type: " + adsk.core.Circle3D.classType())

  if (edge.geometry.objectType == adsk.core.Arc3D.classType()) {
    const arcGeom = edge.geometry
    const arcInfo = getArcGeometryInfo(arcGeom)
    adsk.log("Arc Info: " + arcInfo)
  }
  else if (edge.geometry.objectType == adsk.core.Circle3D.classType()) {

    const circGeom = edge.geometry
    const circleInfo = getCircleGeometryInfo(circGeom)
    adsk.log("Circle Info: " + circleInfo)
  }
}

run();
