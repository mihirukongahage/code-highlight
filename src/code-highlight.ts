import * as vscode from 'vscode';
import utils from './utils';
const crypto = require('crypto');

/**
 * Highlight the selected code segment
 * @param context 
 */
const highlight = (context: vscode.ExtensionContext) => {

    let highlight = vscode.commands.registerCommand('code-save.highlight', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        
        let selectedRange = activeEditor?.selection;
        const range: Range = {
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

        let savedRangeArray = context.workspaceState.get(hashedFilePath, '');
        let rangeArray: string[] = [];
        if(savedRangeArray !== '') {
            rangeArray = JSON.parse(savedRangeArray);
        }
        rangeArray.push(JSON.stringify(range));
        
        // Store the ranges in the workspace storage
        context.workspaceState.update(hashedFilePath, JSON.stringify(rangeArray));

        rangeArray.forEach(singleRangeString => {
            let singleRange = JSON.parse(singleRangeString);
            // Apply the ui changes to the given range
            utils.decorateRange(singleRange);
        });
    });

    return {highlight};
};

export default highlight;