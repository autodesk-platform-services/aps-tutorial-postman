import { adsk } from "@adsk/fas";

function parametersToObject(parameters: adsk.fusion.ParameterList) {
  let out = {};
  for (let i = 0; i < parameters.count; i++) {
    out[parameters.item(i)!.name] = parameters.item(i)!.expression;
  }
  return out;
}

function run() {
  const scriptParameters = JSON.parse(adsk.parameters);
  if (!scriptParameters) throw Error("Invalid parameters provided.");

  const app = adsk.core.Application.get();
  if (!app) throw Error("No asdk.core.Application.");

  const doc = getDocument(
    app,
    false,
    "",
    scriptParameters.fileURN,
  );
  if (!doc) throw Error("Invalid document.");

  const design = doc.products.itemByProductType(
    "DesignProductType",
  ) as adsk.fusion.Design;

  let parameters = scriptParameters.parameters;

  // Read current design parameters
  const pars: adsk.fusion.ParameterList = design.allParameters;
  const before = parametersToObject(pars);
  for (let name in parameters) {
    // Set parameters that are specified in the parameters object,
    // and also exist in the design
    const par: adsk.fusion.Parameter | null = pars.itemByName(name);
    if (par == null) {
      adsk.log(`Parameter "${name}" not found, skipping`);
      delete parameters.par;
      continue;
    }
    par.expression = parameters[name];
  }
  const after = parametersToObject(pars);

  adsk.result = JSON.stringify({ Before: before, After: after });

  const message = `Change parameters: [${Object.keys(parameters).map(
    (key) => `(${key}: ${before[key]} => ${after[key]})`,
  )}]`;
  saveDocument(
    doc,
    true,
    message,
    doc.dataFile.parentFolder,
  );

  while (app.hasActiveJobs) {
    wait(2000);
  }
}

function wait(ms: number) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < ms) adsk.doEvents();
}

function getDocument(
  app: adsk.core.Application,
  useCurrentDocument: boolean,
  hubId: string,
  fileURN: string,
): adsk.core.Document {
  if (useCurrentDocument === true) {
    adsk.log(`Using currently open document: ${app.activeDocument.name}.`);
    return app.activeDocument;
  }

  if (hubId) {
    // Possible hubId formats: base64 encoded string, or business:<id>,
    // or personal:<id> (deprecated)
    const hub =
      app.data.dataHubs.itemById(hubId) ||
      app.data.dataHubs.itemById(`a.${adsk.btoa(`business:${hubId}`, true)}`) ||
      app.data.dataHubs.itemById(`a.${adsk.btoa(`personal:${hubId}`, true)}`);
    if (!hub) throw Error(`Hub with id ${hubId} not found.`);
    adsk.log(`Setting hub: ${hub.name}.`);
    app.data.activeHub = hub;
  }

  const file = app.data.findFileById(fileURN);
  if (!file) throw Error(`File not found ${fileURN}.`);
  let destinationFolder = defaultFolder(
        app,
        "Fusion Automation Service",
      );
  let newfile = file.copy(destinationFolder);
  newfile.name = 'Nut'
  adsk.log(`Opening ${newfile.name}`);
  const document = app.documents.open(newfile, true);
  if (!document) throw Error(`Cannot open file ${newfile.name}.`);
  return document;
}

function saveDocument(
  doc: adsk.core.Document,
  saveAsNewDocument: boolean,
  message: string,
  destinationFolder: adsk.core.DataFolder,
): boolean {
  if (saveAsNewDocument) {
    adsk.log("Saving as new document.");
    try {
      destinationFolder.parentProject;
    } catch (e) {
      adsk.log(
        "Destination folder is not in a project, setting folder to Fusion Automation Service project.",
      );
      destinationFolder = defaultFolder(
        doc.parent,
        "Fusion Automation Service",
      );
    }
    if (
      doc.saveAs(
        doc.name + " modify parameters",
        destinationFolder,
        message,
        "",
      )
    ) {
      adsk.log("Document saved successfully.");
      return true;
    } else {
      adsk.log("Document failed to save.");
      return false;
    }
  }

  if (!doc.isModified) {
    adsk.log("Document not modified, not saving.");
    return true;
  }

  adsk.log(`Saving with message: "${message}".`);
  if (doc.save(message)) {
    adsk.log("Document saved successfully.");
    return true;
  } else {
    adsk.log("Document failed to save.");
    return false;
  }
}

function defaultFolder(app: adsk.core.Application, defaultProjectName: string) {
  const projects = app.data.activeHub.dataProjects;
  if (!projects) throw Error("Unable to get active hub's projects.");
  for (let i = 0; i < projects.count; ++i) {
    const project = projects.item(i)!;
    if (project.name === defaultProjectName) {
      return project.rootFolder;
    }
  }
  adsk.log(`Creating new project: ${defaultProjectName}`);
  const project = projects.add(defaultProjectName);
  if (!project) throw Error("Unable to create new project.");
  return project.rootFolder;
}

run();
