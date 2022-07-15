import * as vscode from 'vscode';

/**
 * returns the path for the project root
 */
function getProjectRootPath(): string | null {
    const workspacePath = vscode.workspace.workspaceFolders;

    let projectRootPath;
    if (workspacePath) {
        let pathArray = workspacePath[0].uri.path;
        let projectPath = pathArray.split('/');
        projectPath?.pop();
        projectRootPath = `${projectPath.join("/")}`;
    }

    return projectRootPath || null;
}
  
module.exports = getProjectRootPath;
export {};