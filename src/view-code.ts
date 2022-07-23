import * as vscode from "vscode";
import webView from "./web-view";
import util from "./utils";
const fs = require("fs");

/**
 * View code in a separate web view within vscode
 */
let disposable = vscode.commands.registerCommand(
  "code-highlight.viewCode",
  async () => {
    const activeEditor = vscode.window.activeTextEditor;

    let projectRootPath = util.getProjectRootPath();
    let projectName = util.getProjectName();
    let fileContent: string = "";
    let fileName;

    let filePath = activeEditor?.document.fileName;
    fileName = filePath?.split("/").pop();

    try {
      fileContent = fs.readFileSync(
        `${projectRootPath}/${projectName}-codesave/${fileName}.txt`,
        "utf8"
      );
    } catch (err) {
      vscode.window.showInformationMessage("No saved code for this file");
    }

    // Get display content
    let content = util.extractContent(fileContent);

    /**
     * View the web content
     */
    const panel = vscode.window.createWebviewPanel(
      "codeView",
      "Code View",
      vscode.ViewColumn.One,
      {}
    );
    panel.webview.html = webView(content);
  }
);

export default disposable;
