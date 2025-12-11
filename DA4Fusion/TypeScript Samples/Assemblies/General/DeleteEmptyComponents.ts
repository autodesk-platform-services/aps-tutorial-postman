import { adsk } from "@adsk/fas";

function run() {

  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  // Create a document.
  const design = app.activeProduct as adsk.fusion.Design

  if (!design) {
    adsk.log('No active Fusion design')
    return
  }
  const components = design.allComponents

  // Find all of the empty components.
  // It is empty if it has no occurrences, bodies, featres, sketches, or construction.
  const rootComp = design.rootComponent
  const trans = adsk.core.Matrix3D.create()

  // Create empty components
  const numberOfEmptyComponents = 3
  for (let i = 0; i < numberOfEmptyComponents; i++) {
    rootComp.occurrences.addNewComponent(trans)
  }
  const componentsToDelete: adsk.fusion.Component[] = []

  for (let i = 0; i < components.count; i++) {
    const component = components.item(i)
    //Skip the root component.
    if (rootComp == component) {
      continue
    }

    if (component.occurrences.count == 0
      && component.bRepBodies.count == 0
      && component.features.count == 0
      && component.sketches.count == 0
      && component.constructionPlanes.count == 0
      && component.constructionAxes.count == 0
      && component.constructionPoints.count == 0) {

      componentsToDelete.push(component)
    }
  }
  // Delete all immediate occurrences of the empty components.
  const deletedComponents: string[] = []
  for (let component of componentsToDelete) {

    // Get the name first because deleting the final Occurrence will delete the Component.
    const name = component.name

    // Build a list of unique immediate occurrences of the component.
    const occurrences = rootComp.allOccurrencesByComponent(component)
    const uniqueOccurrences: adsk.fusion.Occurrence[] = []

    for (let i = 0; i < occurrences.count; i++) {
      const occurrence = occurrences.item(i)
      let index = 0

      for (let k = 0; k < uniqueOccurrences.length; k++) {
        if (occurrence === uniqueOccurrences[k]) {
          break
        }
        index = k + 1
      }
      if (index == uniqueOccurrences.length) {
        uniqueOccurrences.push(occurrence)
      }

    }

    // Delete them.
    for (let uniqueOccurrencesI of uniqueOccurrences) {
      uniqueOccurrencesI.deleteMe()
    }
    deletedComponents.push(name)
  }

  let msg = ""
  if (deletedComponents.length == 0) {
    msg = 'No empty components found.'
  }
  else {
    if (deletedComponents.length > 1) {
      msg = String(deletedComponents.length) + ' empty component' + 's'
    }
    else {
      msg = String(deletedComponents.length) + ' empty component' + ' deleted'

    }
    msg += '\n\n'
    for (let deletedComponentI of deletedComponents) {
      msg += '\n' + deletedComponentI
    }

  }
  adsk.log(msg)

}
run();
