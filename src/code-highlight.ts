import * as vscode from 'vscode';
import utils from './utils';
const crypto = require('crypto');

/**
 * Highlight the selected code segments
 * Remove the highlighted code segments
 * @param context 
 */
const highlight = (context: vscode.ExtensionContext) => {

    // Highlight selected code segments
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

    // Remove highlights
    let removeHighlight = vscode.commands.registerCommand('code-save.removeHighlight', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        // Current cursor position
        let cursorPosition = activeEditor?.selection.active;

        let filePath = activeEditor?.document.uri.fsPath;
        let hashedFilePath = crypto.createHash('sha1').update(filePath).digest('hex');
        let savedRangeArray = context.workspaceState.get(hashedFilePath, '');

        let parsedSavedRangeArray = JSON.parse(savedRangeArray);

        let i = 0;
        let index = null;
        parsedSavedRangeArray.forEach((singleRangeString: string) => {
            let singleRange = JSON.parse(singleRangeString);

            if (!cursorPosition) {
                return {};
            }
            let cursorPositionOffset = activeEditor?.document.offsetAt(cursorPosition);

            // Start and End selected position
            let rangeStartPosition = new vscode.Position(singleRange.startLine, singleRange.startCharacter); 
            let rangeEndPosition = new vscode.Position(singleRange.endLine, singleRange.endCharacter);

            let rangeStartPositionOffset = activeEditor?.document.offsetAt(rangeStartPosition);
            let rangeEndPositionOffset = activeEditor?.document.offsetAt(rangeEndPosition);

            if (cursorPositionOffset && rangeStartPositionOffset && rangeEndPositionOffset && cursorPositionOffset >= rangeStartPositionOffset && cursorPositionOffset <= rangeEndPositionOffset) {
                index = i;
            }
            i = i + 1;
        });

        if (index === null) {
            vscode.window.showInformationMessage('Cursor not on highlighted code');
            return {};
        }
        parsedSavedRangeArray.splice(index, 1);

        // Store the ranges in the workspace storage
        await context.workspaceState.update(hashedFilePath, JSON.stringify(parsedSavedRangeArray));

        // Reload workspace 
        vscode.commands.executeCommand('workbench.action.reloadWindow');

    });

    // Remove all highligted code segments for a file
    let removeAllHighlight = vscode.commands.registerCommand('code-highlight.removeAllHighlights', async () => {        
        const activeEditor = vscode.window.activeTextEditor;
        let filePath = activeEditor?.document.uri.fsPath;
        let hashedFilePath = crypto.createHash('sha1').update(filePath).digest('hex');
        
        // Remove all workspace storage for the file
        context.workspaceState.update(hashedFilePath, '');

        // Reload workspace 
        vscode.commands.executeCommand('workbench.action.reloadWindow');
    });

    return { highlight, removeHighlight, removeAllHighlight };
};

export default highlight;