import { RenderContent } from "./types/render-content";

/**
 * Web view for the saved codes
 * @param content  
 */
export default function getWebviewContent(content: RenderContent) {
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
            <h4>${content.dateTime}</h4>
            <h4>${content.comment}</h4>
            <pre class="line-numbers">
                <code class="language-javascript">${content.code}</code>
            </pre>
        </div>
    </div>
  </body>
  </html>`;
}
