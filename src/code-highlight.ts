import * as vscode from 'vscode';

let disposable = vscode.commands.registerCommand('code-save.highlight', async () => {
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {

        let position = activeEditor.selection;

        const range = {
            startCharacter: position.start.character,
            startLine: position.start.line,
            endCharacter: position.end.character,
            endLine: position.end.line
        };

        const decoration = [{ range: new vscode.Range(range.startLine, range.startCharacter, 
            range.endLine, range.endCharacter) }];

        const options = {
            backgroundColor: "red",
        };
        const decorationType = vscode.window.createTextEditorDecorationType(options);

        activeEditor.setDecorations(decorationType, decoration);
   
    } else {
        vscode.window.showInformationMessage('Active editor not found');
    }
});

export default disposable;