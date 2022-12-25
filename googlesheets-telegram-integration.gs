const API_KEY = 'api key telegramm bot';
const CHAT_ID = 'id chat with bot'; 
const TABLE_ID = 'id google sheet';
const LIST_NAME = 'name google sheet';

function onEditInstall(event) {
  let range = event.range;
  const data = SpreadsheetApp.openById(TABLE_ID).getSheetByName(LIST_NAME).getDataRange().getValues(); 
  let sh = SpreadsheetApp.getActiveSheet();
  let col = event.range.getColumn();

  // Find the last nonempty row in first col
  let C = sh.getRange('A1:A' + sh.getMaxRows()).getDisplayValues();
  for (let i = sh.getMaxRows()-1; i >= 0; i--) {
    let cc = C[i][0];
    if (C[i] != '') {var LastRow = i+1; i=0}
  }
  lr = LastRow - 1;

  // Text msg for bot telegramm
  const text = "Application assigned: " + data[lr][0] +" "+ data[lr][1] + "\nPriority: " + data[lr][2] + "\nExecutor: " + data[lr][3];
 
  // Notification only after certain column is filled
  if (col == 5) {
    
    // Check if the line is completely filled
    if(data[lr][0] != "" & data[lr][1] != "" & data[lr][2] != "" & data[lr][3] != "" & data[lr][4] != "")  {
      const res = sendMessage({ chat_id: CHAT_ID, text});
    } else {
      console.log("Line is not filled");
    }

  } else {
    console.log("Table changes do not require notification");
  }
}

function api(METHOD_NAME) {
  return `https://api.telegram.org/bot${API_KEY}/` + METHOD_NAME
}

function sendMessage(params) {
  const uf = UrlFetchApp.fetch(api('sendMessage') + '?' + serialize(params), {
    muteHttpExceptions: true
  });
  return uf;
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};