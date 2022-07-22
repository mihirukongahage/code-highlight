import { SaveObject } from "./types/save-object";

/**
 * Web view for the saved codes
 * @param content  
 */
export default function getWebviewContent(content: SaveObject) {

    var innerHtml = '';
    content.save.forEach(element => {
        innerHtml += `
        <div class="segment">
            <table class="tab">
                <tr>
                    <td class='table_comment'>
                        <div class="table_comment_head">Comment</div>
                        <div class='table_comment_content'>${element.comment}</div>
                    </td>
                    <td class='table_datetime'>
                        <div class="table_datetime_head">Date Time</div>
                        <div class='table_datetime_content'>${element.dateTime}</div>
                    </td>
                </tr>
            </table> 
            <pre class="code-styles">
                <code class="language-javascript">
                    <div class="code"> ${element.code} </div>
                </code>
            </pre>
        </div>
        `;
    });


  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/themes/prism.min.css"/>
      <style>

        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 100%;
            border-radius: 5px;
            background-color: white
        }
        .card_content {
            padding: 3%;
        }
        .card_header {
            padding-bottom: 10px;
        }

        .header_desc {
            color: #B2BEB5; 
            font-weight: 700; 
            font-size: 12px;
        }
        .header_content {
            color: black; 
            font-weight: 500; 
            font-size: 15px;
        }
        
        // .code {
        //     font-size: 13px;
        //     color: black;
        // }
        .table_comment {
            float: left; 
            text-align: left
        }
        .table_datetime {
            float: right; 
            text-align: right
        }

        .table_comment_head {
            float: left; 
            color: #B2BEB5; 
            font-size:11px
        }
        .table_datetime_head {
            float: right; 
            color: #B2BEB5; 
            font-size:11px
        }

        .table_comment_content {
            float: left;
            font-size: 13px;
            color: black;
        }
        .table_datetime_content {
            float: right;
            font-size: 13px;
            color: black;
        }

        td { 
            white-space:pre;
        }
        .segment {
            padding-top: 25px;
        }
        .tab {
            width: 100%;
        }
        .code-styles {
            font-family: "Lucida Console", Monaco, monospace;
		    font-size: 12px;
            border-style: none none none solid;
            border-width: 5px;
            border-color: #0000FF;
            border-radius: 5px;
            background-color: #E6E6FA;
            
        }
        
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

    </style>
  </head>
  <body>
    <div class="card">
        <div class="card_content">
            <div class='card_header'>
                <div class="header_desc">File Name</div>
                <div  class='header_content'>${content.fileName}</div>
            </div>

            <div class='card_header'>
                <div class="header_desc">File Path</div>
                <div class='header_content' style='font-size: 13px;'>${content.filePath}</div>
            </div>

            <div class='card_header'>
                <div class="header_desc">Language</div>
                <div class='header_content' style='font-size: 13px;'>${content.language}</div>
            </div>

            <div>
                ${innerHtml}
            </div>

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/prism.min.js"></script>
  </body>
  </html>`;
}
