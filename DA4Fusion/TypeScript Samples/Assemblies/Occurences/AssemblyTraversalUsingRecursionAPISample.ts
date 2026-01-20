import { adsk } from "@adsk/fas";

// Performs a recursive traversal of an entire assembly structure.
function traverseAssembly(occurrences: adsk.fusion.OccurrenceList, currentLevel: number): { name: string; children: any[] }[] {
  const result: { name: string; children: any[] }[] = [];

  for (let i = 0; i < occurrences.count; i++) {
    const occ = occurrences.item(i);
    const occData = {
      name: occ.name,
      children: [] as { name: string; children: any[] }[]
    };

    if (occ.childOccurrences) {
      occData.children = traverseAssembly(occ.childOccurrences, currentLevel + 1);
    }

    result.push(occData);
  }

  return result;
}

function run() {
  // Get the Fusion API's application object
  const app = adsk.core.Application.get();
  if (!app) throw Error("No adsk.core.Application.");

  // Create a document.
  const doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)

  const design = app.activeProduct as adsk.fusion.Design;
  if (!design) {
    adsk.log("No active Fusion design.");
    return;
  }

  // Get the root component of the active design.
  const rootComp = design.rootComponent;

  // Call the recursive function to traverse the assembly and build the JSON object.
  const resultJson = {
    root: {
      name: `Root (${design.parentDocument.name})`,
      children: traverseAssembly(rootComp.occurrences.asList, 1)
    }
  };

  // Display the result.
  adsk.result = JSON.stringify(resultJson, null, 2)
}

run();
