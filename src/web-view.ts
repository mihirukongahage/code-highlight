import { SaveObject } from "./types/save-object";

/**
 * Web view for the saved codes
 * @param content  
 */
export default function getWebviewContent(content: SaveObject) {

    var innerHtml = '';
    content.save.forEach(element => {
        innerHtml += `
            <div> ${element.dateTime} </div>
            <div> ${element.comment} </div>
            <pre class="line-numbers">
                <code class="language-javascript">
                    <div"> ${element.code} </div>
                </code>
            </pre>
        `;
    });


  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
      <style>
        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 100%;
            border-radius: 5px;
            background-color: white
        }
        
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

        .content {
            padding: 3%;
            color: black;
        }
    </style>
  </head>
  <body>
    <div class="card">
        <div class="content">
            <h4>${content.fileName}</h4>
            <h4>${content.filePath}</h4>
            <h4>${content.language}</h4>

            <div>${innerHtml}</div>

        </div>
    </div>
  </body>
  </html>`;
}
