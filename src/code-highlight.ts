import * as vscode from 'vscode';
import utils from './utils';
const crypto = require('crypto');

/**
 * Highlight the selected code segment
 * @param context 
 */
const highlight = (context: vscode.ExtensionContext) => {

    let disposable = vscode.commands.registerCommand('code-save.highlight', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        
        let selectedRange = activeEditor?.selection;
        const range = {
            startCharacter: selectedRange?.start.character,
            startLine: selectedRange?.start.line,
            endCharacter: selectedRange?.end.character,
            endLine: selectedRange?.end.line
        };

        /**
         * Store highlighted range in vscode local workspace as a key value pair
         * k: hashed file path, v: Range object 
         */
        let filePath = activeEditor?.document.uri.fsPath;
        let hashedFilePath = crypto.createHash('sha1').update(filePath).digest('hex');
        context.workspaceState.update(hashedFilePath, range);

        /**
         * Apply the ui changes to the given range
         */
        utils.decorateRange(range);
    });

    return disposable;
};


export default highlight;