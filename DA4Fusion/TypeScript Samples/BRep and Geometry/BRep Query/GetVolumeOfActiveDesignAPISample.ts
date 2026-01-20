import { adsk } from "@adsk/fas";

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

  const design = app.activeProduct as adsk.fusion.Design
  if (!design) throw Error("No active Fusion design");

  // Get the root component of the active design.
  const rootComp = design.rootComponent

  createCylinder(rootComp)

  // Iterate over any bodies in the root component.
  let totalVolume = 0
  for (let j = 0; j < rootComp.bRepBodies.count; j++) {
    const body = rootComp.bRepBodies.item(j)

    // Get the volume of the current body and add it to the total.
    totalVolume += body.volume
  }

  // Iterate through all of the occurrences in the assembly.
  for (let i = 0; i < rootComp.allOccurrences.count; i++) {
    const occ = rootComp.allOccurrences.item(i)

    // Get the associated component.
    const comp = occ.component

    // Iterate over all of the bodies within the component.
    for (let j = 0; j < comp.bRepBodies.count; j++) {
      // Get the current body.
      const body = comp.bRepBodies.item(j)

      // Get the volume of the current body and add it to the total.
      totalVolume += body.volume
    }
  }

  // Format a string to display the volume using the default distance units.
  const result = design.unitsManager.formatValue(totalVolume, design.unitsManager.defaultLengthUnits + '^3')
  adsk.log(`The volume of the entire asembly is: ${result}`)
}
run();
