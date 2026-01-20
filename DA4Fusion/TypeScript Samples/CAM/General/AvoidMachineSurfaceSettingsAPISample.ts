import { adsk } from "@adsk/fas";

const dupName = "Avoid/Machine using API";
const information = `
This sample script demonstrates Machine/Avoid/Gouge/Fixture functionality. 
Move this dialog to one side and notice the following about the default operation:

    The existing operation machines the top face (yellow) and within the slot and hole.
    The supporting blocks (red) and the fixture plate (purple) are needlessly machined.
    We want it to avoid machining the top face, the fixture and within the slot and hole.
    Cap surfaces are provided for the slot and hole (colored green when set to visible).
    The mounting blocks are designated sacrificial so we can machine vertical walls fully.

To achieve this, we duplicate the first operation and assign labels to surface groups.
Both radial and axial “stock-to-leave” values can also be applied.

Acknowledge this dialog and select the operation named "${dupName}" 
to see the new improved tool path.
`;

// Global variables
const _app = adsk.core.Application.get() as adsk.core.Application;
if (!_app) throw Error("No asdk.core.Application.");
const _ui = _app.userInterface as adsk.core.UserInterface;
if (!_ui) throw new Error("Failed to get user interface.");

let _machineAvoidGroups: adsk.cam.MachineAvoidGroups;
let _cam: adsk.cam.CAM
let _design: adsk.fusion.Design
const PROJECT_URN = "urn:adsk.wipprod:fs.file:vf.rxjQ68iyTN2ui31aDQULDw?version=1";

const modes = ["Avoid", "Machine", "Gouge", "Fixture"];
const modeColor: Record<string, adsk.core.Color | null> = {
  [modes[adsk.cam.MachiningMode.Avoid_MachiningMode]]: adsk.core.Color.create(255, 255, 113, 30), // Yellow
  [modes[adsk.cam.MachiningMode.Machine_MachiningMode]]: adsk.core.Color.create(104, 255, 0, 30), // Green
  [modes[adsk.cam.MachiningMode.Gouge_MachiningMode]]: adsk.core.Color.create(204, 51, 51, 30), // Red
  [modes[adsk.cam.MachiningMode.Fixture_MachiningMode]]: adsk.core.Color.create(180, 120, 255, 30), // Purple
};

function run() {
  try {


    // Load by URN a specific sample project
    const doc = loadProjectFromURN(PROJECT_URN);
    if (!doc) return;
    const products = doc.products;

    // Switch to the manufacturing workspace (CAM environment)
    const camWS = _ui.workspaces.itemById("CAMEnvironment") as adsk.core.Workspace;
    camWS.activate();

    _cam = products.itemByProductType("CAMProductType") as adsk.cam.CAM;
    if (!_cam) { throw Error("Failed to get CAM product"); }

    _design = products.itemByProductType("DesignProductType") as adsk.fusion.Design;
    if (!_design) { throw Error("Failed to get Design product"); }

    const setups = _cam.setups;

    // Ensure the document contains a Setup
    let setup: adsk.cam.Setup;
    if (setups.count > 0) {
      setup = setups.item(0) as adsk.cam.Setup;
    } else {
      adsk.log("This script requires that there is a Setup in the Fusion Document");
      return
    }

    const operations = setup.operations;

    // Remove all but the first operation
    for (let opNum = 1; opNum < operations.count; opNum++) {
      const operation = operations.item(opNum) as adsk.cam.Operation;
      operation.deleteMe();
    }

    // Duplicate the first operation in the setup
    if (operations.count > 0) {
      const opOriginal = operations.item(0) as adsk.cam.Operation;
      opOriginal.isLightBulbOn = true;
      opOriginal.duplicate();
      const opDuplicate = operations.item(1) as adsk.cam.Operation;
      opDuplicate.name = dupName;
      adsk.log(`The toolpath "${opOriginal.name}" has been duplicated and then renamed as "${opDuplicate.name}"`);

      // Get the "checkSurfaceSelectionSets" parameter
      const checkSurfaceSelectionSets = opDuplicate.parameters.itemByName("checkSurfaceSelectionSets") as adsk.cam.CAMParameter;
      const surfaceGroupsParam = checkSurfaceSelectionSets.value as adsk.cam.CadMachineAvoidGroupsParameterValue;

      // Get the MachineAvoidGroups object
      _machineAvoidGroups = surfaceGroupsParam.getMachineAvoidGroups();

      // Create groups
      if (!createMachineAvoidGroup("Selection Set3", adsk.cam.MachiningMode.Machine_MachiningMode, 0.2, 0.1)) return;
      if (!createMachineAvoidGroup("Selection Set1", adsk.cam.MachiningMode.Avoid_MachiningMode, 0.05, 0.02)) return;
      if (!createMachineAvoidGroup("fixture_base", adsk.cam.MachiningMode.Fixture_MachiningMode, 5.0, 0.6)) return;
      if (!createMachineAvoidGroup("sacrificial_block1", adsk.cam.MachiningMode.Gouge_MachiningMode)) return;
      if (!createMachineAvoidGroup("sacrificial_block2", adsk.cam.MachiningMode.Gouge_MachiningMode)) return;

      // Add the groups back to the parameter
      surfaceGroupsParam.applyMachineAvoidGroups(_machineAvoidGroups);

      // Explain what has happened and how to see the result
      adsk.log(information);

      // Generate the operation
      _cam.generateToolpath(opDuplicate);

      // Display the new toolpath
      opOriginal.isLightBulbOn = false;
      opDuplicate.isLightBulbOn = true;

      adsk.doEvents();
      return;
    } else {
      adsk.log("This script requires that there is an existing operation in the Setup.");
      return
    }
  } catch (e) {
    adsk.log(`Failed: ${e}`);
    return
  }
}

function createMachineAvoidGroup(
  name: string,
  mode: adsk.cam.MachiningMode,
  axialOffset?: number,
  radialOffset?: number
): boolean {
  if (!_machineAvoidGroups) return false;
  const machineAvoidGroup = _machineAvoidGroups.createNewMachineAvoidDirectSelectionGroup()
  machineAvoidGroup.machineMode = mode;

  // Gouge groups require no offsets to be specified.
  if (mode !== adsk.cam.MachiningMode.Machine_MachiningMode) {
    if (radialOffset !== undefined) machineAvoidGroup.radialOffset = radialOffset;
    if (axialOffset !== undefined) machineAvoidGroup.axialOffset = axialOffset;
  }

  if (
    mode === adsk.cam.MachiningMode.Machine_MachiningMode ||
    mode === adsk.cam.MachiningMode.Avoid_MachiningMode
  ) {
    const faceSelSet = _design.selectionSets.itemByName(name);
    if (faceSelSet) {
      machineAvoidGroup.inputGeometry = faceSelSet.entities;
    } else {
      adsk.log(`The Selection Set "${name}" does not exist in the current Fusion document`);
      return false
    }
  } else {
    // Add the face/body/component to the exclusiveGroup selection.
    const bodySelect = _cam.designRootOccurrence.bRepBodies.itemByName(name);
    if (bodySelect) {
      machineAvoidGroup.inputGeometry = getFacesAll(bodySelect);
    } else {
      adsk.log(`The Body "${name}" does not exist in the current Fusion document`);
      return false;
    }
  }
  const face = machineAvoidGroup.inputGeometry as adsk.fusion.BRepFace[];
  colorFaces(face, mode);
  return true;
}

function getFacesAll(body: adsk.fusion.BRepBody): adsk.fusion.BRepFace[] {
  const allFaces: adsk.fusion.BRepFace[] = [];
  for (let i = 0; i < body.faces.count; i++) {
    const face = body.faces.item(i) as adsk.fusion.BRepFace;
    allFaces.push(face);
  }
  return allFaces;
}

function colorFaces(faces: adsk.fusion.BRepFace[], mode: adsk.cam.MachiningMode) {
  const modeName = modes[mode];
  for (const face of faces) {
    const appearances = _design.appearances;
    let colorAppearance = appearances.itemByName(modeName);

    if (!colorAppearance) {
      const appearanceLib = _app.materialLibraries.itemById("BA5EE55E-9982-449B-9D66-9F036540E140") as adsk.core.MaterialLibrary;
      const genericAppearance = appearanceLib.appearances.itemById("Prism-129") as adsk.core.Appearance;
      colorAppearance = appearances.addByCopy(genericAppearance, modeName) as adsk.core.Appearance;
      const colorProperty = colorAppearance.appearanceProperties.itemById("opaque_albedo") as adsk.core.ColorProperty;
      const color = modeColor[modeName];
      if (!color) { throw Error(`Color not found for mode: ${modeName}`) };
      colorProperty.value = color;
    }
    face.appearance = colorAppearance;
  }
  adsk.doEvents();
}

function loadProjectFromURN(urn?: string): adsk.core.Document | null {
  let doc: adsk.core.Document | null = null;
  if (urn) {
    try {
      const project = _app.data.findFileById(urn);
      if (project) {
        doc = _app.documents.open(project, true);
      } else {
        adsk.log(`File not found for URN: ${urn}!`);
      }
    } catch (e: any) {
      if (typeof e === "string" && e.startsWith("3 : Design is located in another team.")) {
        if (!doc) doc = _app.activeDocument;
      } else if (typeof e === "string" && e.startsWith("3 : file not found")) {
        adsk.log(`File not found for URN: ${urn}!`);
      } else {
        adsk.log(`Failed: ${e}`);
      }
    }
  }
  return doc;
}

run();