import * as vscode from 'vscode';
import codeSave from "./code-save";
import viewCode from "./view-code";
import highlight from "./code-highlight";
import utils from './utils';

const crypto = require('crypto');

export function activate(context: vscode.ExtensionContext) {

    /**
     * Highlight selected code segment 
     */
    let codeHighlight = highlight(context);
    context.subscriptions.push(codeHighlight.highlight);
    context.subscriptions.push(codeHighlight.removeHighlight);

    context.subscriptions.push(codeSave);
    context.subscriptions.push(viewCode);

    /**
     * Function to be triggered once a new file is open
     * Decorate the file using local storage ranges (Persistant highlighting)
     */
    vscode.window.onDidChangeActiveTextEditor(() => {
        let filePath = vscode.window.activeTextEditor?.document.uri.fsPath;
        let hashedFilePath = crypto.createHash('sha1').update(filePath).digest('hex');

        let range = context.workspaceState.get(hashedFilePath, '');
        JSON.parse(range).forEach((element: string) => {
            // Apply the ui changes to the given range
            utils.decorateRange(JSON.parse(element));
            });
        });
}

export function deactivate() {}


