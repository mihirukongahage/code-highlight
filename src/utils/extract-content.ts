import * as vscode from 'vscode';
import { endSaveString, newSaveString } from '../types/const';
import { Save, SaveObject } from '../types/save-object';

/**
 * Extract display content from txt files
 * @params string
 */
// TODO: Implement the logic ina a simple and better way
const extractContent = (fileContent: string): SaveObject => {
    let fileContentArray = fileContent.split('\n');

    let content: SaveObject = {
        fileName: fileContentArray[0],
        filePath: fileContentArray[1],
        language: fileContentArray[2],
        save: []
    };

    let saveContentArray = fileContentArray.splice(3);

    let areaRef = '';
    let singleSave: Save = {
        dateTime: '',
        comment: '',
        code: ''
    };
    let codeArray: string[] = [];
    saveContentArray.forEach((save: string) => {
        if (save === newSaveString) {
            areaRef = 'BEGIN';
            codeArray = [];
        }
        if (save === endSaveString) {
            singleSave.code = codeArray.join('\n');
            content.save.push(singleSave);
            singleSave = {
                dateTime: '',
                comment: '',
                code: ''
            };
        }

        if(areaRef === 'MID') {
            codeArray.push(save);
        }

        if(areaRef === 'BEGIN') {
            if(save[0] === 'D') {
                singleSave.dateTime = save;
            }
            if(save[0] === 'C') {
                singleSave.comment = save;
                areaRef = 'MID';
            }
        }
        
    });

    return content;
};

module.exports = extractContent;
export {};