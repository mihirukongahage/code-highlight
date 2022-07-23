export interface SaveObject {
  fileName: string;
  filePath: string;
  language: string;
  save: Save[];
}

export interface Save {
  dateTime: string;
  comment: string;
  code: string;
}
