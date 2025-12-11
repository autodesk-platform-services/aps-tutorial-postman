import { adsk } from "@adsk/fas";

function createComponents(rootComp: adsk.fusion.Component) {

  const trans = adsk.core.Matrix3D.create()
  const occ1 = rootComp.occurrences.addNewComponent(trans)
  // Get the associated component.
  const newComp = occ1.component

  // Create a new sketch on the xy plane and draw a circle.
  const sketches = newComp.sketches
  const xyPlane = newComp.xYConstructionPlane
  const sketch = sketches.add(xyPlane)
  sketch.sketchCurves.sketchCircles.addByCenterRadius(adsk.core.Point3D.create(0, 0, 0), 5.0)

  // Create an extrusion.
  const extInput = newComp.features.extrudeFeatures.createInput(sketch.profiles.item(0), adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
  // Define that the extent is a distance extent of 5 cm
  const distance = adsk.core.ValueInput.createByReal(10.0)

  // Set the distance extent
  const distanceExtentDef = adsk.fusion.DistanceExtentDefinition.create(distance)
  extInput.setOneSideExtent(distanceExtentDef, adsk.fusion.ExtentDirections.PositiveExtentDirection)
  const ext = newComp.features.extrudeFeatures.add(extInput)

  trans.setCell(0, 3, 15.0)
  const newOcc = rootComp.occurrences.addExistingComponent(newComp, trans)
}

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

  createComponents(rootComp)

  // Build a list of occurrences because breaking a link will cause the
  // collection to be modified and causes a problem iterating over the colection.
  const occs: adsk.fusion.Occurrence[] = []
  for (let i = 0; i < rootComp.occurrences.count; i++) {
    const occ = rootComp.occurrences.item(i)
    occs.push(occ)
  }
  // Iterate through the top - level occurrences to see if any of them are external references.
  for (let occ of occs) {
    if (occ.isReferencedComponent) {
      occ.breakLink()
    }
  }
}

run();
