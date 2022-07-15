import * as vscode from 'vscode';

/**
 * Apply the ui changes to the given range
 * @params Range
 */
const decorateRange = (range: Range) => {
    const activeEditor = vscode.window.activeTextEditor;

    const decoration = [{ range: new vscode.Range(range.startLine, range.startCharacter, range.endLine, range.endCharacter) }];
    const options = {
        backgroundColor: "red",
    };
    const decorationType = vscode.window.createTextEditorDecorationType(options);
    activeEditor?.setDecorations(decorationType, decoration);
};

module.exports = decorateRange;
export {};