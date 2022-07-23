import * as vscode from "vscode";

/**
 * returns the active project name
 */
function getProjectName(): string | null {
  const workspacePath = vscode.workspace.workspaceFolders;

  let projectName;
  if (workspacePath) {
    let pathArray = workspacePath[0].uri.path;
    let projectPath = pathArray.split("/");
    projectName = projectPath?.pop();
  }

  return projectName || null;
}

module.exports = getProjectName;
export {};
