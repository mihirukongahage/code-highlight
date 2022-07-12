import * as vscode from 'vscode';
import codeSave from "./code-save";
import viewCode from "./view-code";

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(codeSave);
    context.subscriptions.push(viewCode);
}

export function deactivate() {}


