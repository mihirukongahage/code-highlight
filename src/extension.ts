import * as vscode from 'vscode';

function getSavePath(urlString: readonly vscode.WorkspaceFolder[], fileName: string): vscode.Uri {
    let pathArray = urlString[0].uri.path;
    let projectPath = pathArray.split('/');
    let projectName = projectPath?.pop();
    let pathUri = vscode.Uri.file(`${projectPath.join("/")}/${projectName}-codesave/${fileName}.txt`);

    return pathUri;
}

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('code-save.saveCode', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        const workspacePath = vscode.workspace.workspaceFolders;

        if (activeEditor) {

            // Selected code snippet to be saved
            let textSelected = activeEditor.selection;
            let codeSnippet = activeEditor.document.getText(textSelected);

            // Avoid saving empty strings
            if(codeSnippet.replace(/\s/g, '') === '') {
                vscode.window.showInformationMessage('Selected code snippet not found');
                return console.error();
            }

            // Comment for the selected code snippet
            let comment = await vscode.window.showInputBox({ 
                placeHolder: 'Comment for the selected code' 
            });

            // File path
            let filePath = activeEditor.document.fileName;
            let fileName = filePath.split('/').pop();
            let language = vscode.window.activeTextEditor?.document.languageId;

            // Date and time
            let dateTime = new Date();

            // Data to be written
            let data = `File Name: ${fileName} \nFile Path: ${filePath} \nLanguage: ${language} \nDatetime: ${dateTime} \nComment: ${comment} \n\n${codeSnippet}`;
            const writeData = Buffer.from(data, 'utf8');

            // Write data to the file
            if (workspacePath && fileName) {
                vscode.workspace.fs.writeFile(getSavePath(workspacePath, fileName), writeData);
                vscode.window.showInformationMessage('Code Saved');
            } else {
                vscode.window.showInformationMessage('Workspace not found');
            }
        
        } else {
            vscode.window.showInformationMessage('Active editor not found');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}


