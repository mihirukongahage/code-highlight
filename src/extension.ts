import * as vscode from 'vscode';
import codeSave from "./code-save";
import viewCode from "./view-code";
import highlight from "./code-highlight";

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(codeSave);
    context.subscriptions.push(viewCode);
    context.subscriptions.push(highlight);
}

export function deactivate() {}


