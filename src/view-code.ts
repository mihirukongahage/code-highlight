import * as vscode from 'vscode';
import webView from './web-view';
import util from './utils';
const fs = require('fs');
import { RenderContent } from "./types/render-content";

/**
 * View code in a separate web view within vscode
 */
let disposable = vscode.commands.registerCommand('code-save.viewCode', async () => {

    const activeEditor = vscode.window.activeTextEditor;

    let projectRootPath = util.getProjectRootPath();
    let projectName = util.getProjectName();
    let fileContent: string = "";
    let fileName;

    let filePath = activeEditor?.document.fileName;
    fileName = filePath?.split('/').pop();

    try {
        fileContent = fs.readFileSync(`${projectRootPath}/${projectName}-codesave/${fileName}.txt`, 'utf8');
    } catch (err) {
        vscode.window.showInformationMessage('No saved code for this file');
    }

    let fileContentArray = fileContent.split('\n');

    let content: RenderContent = {
        fileName: fileContentArray[0],
        filePath: fileContentArray[1],
        language: fileContentArray[2],
        dateTime: fileContentArray[3],
        comment: fileContentArray[4],
        code: fileContentArray.slice(6).join('\n')
    };

    /**
     * View the web content
     */
    const panel = vscode.window.createWebviewPanel(
        'codeView',
        'Code View',
        vscode.ViewColumn.One,
        {}
      );
      panel.webview.html = webView(content);
});

export default disposable;