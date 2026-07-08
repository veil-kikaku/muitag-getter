const SHEET_NAME = "posts";

const form = document.querySelector("form");
const message = document.getElementById("message");

form.addEventListener("submit", () => {

    message.textContent = "投稿しました！";

    setTimeout(loadPosts, 1000);

});

function doGet() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME);

  const values = sheet.getDataRange().getValues();

  const posts = [];

  for (let i = 1; i < values.length; i++) {

    posts.push({
      url: values[i][0],
      date: values[i][1]
    });

  }

  return ContentService
    .createTextOutput(JSON.stringify(posts))
    .setMimeType(ContentService.MimeType.JSON);

}
