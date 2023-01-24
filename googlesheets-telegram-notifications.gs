const API_KEY = 'api key telegramm bot';
const CHAT_ID = 'id chat with bot'; 
const TABLE_ID = 'id google sheet';
const LIST_NAME = 'name google sheet';
const SPR_NAME = 'dict name';
const triggerCol = [4,5]; 

// Document edit trigger
function onEditInstall(event) {

  // Get the address of the cell to change
  let range = event.range;
  let changeCol = event.range.getColumn();
  let changeRow = event.range.getRow() - 1;

  // Notification only after certain column is filled
  if (triggerCol.includes(changeCol)) {
    
    // Getting data from a sheet with tasks
    const data = SpreadsheetApp.openById(TABLE_ID).getSheetByName(LIST_NAME).getDataRange().getValues(); 
 
    // Getting values from the directory
    const sprTlg = SpreadsheetApp.openById(TABLE_ID).getSheetByName(SPR_NAME).getDataRange().getValues();

    // Add dict in map for best search
    let dictMap = new Map();
    for (i = 3; i < 32; i++) {
      dictMap.set(sprTlg[i][3], sprTlg[i][2]);
    }

    // Text msg for bot telegramm
    const text = "Application assigned: " + data[changeRow][0] +" "+ data[changeRow][1]
    + "\nPriority: " + data[changeRow][2]
    + "\nexecutor: " + data[changeRow][3] + "\n"
    + dictMap.get(data[changeRow][3]);

    // Check if the line is completely filled
    if(data[changeRow][0] != "" & data[changeRow][1] != "" & data[changeRow][2] != "" & data[changeRow][3] != "" & data[changeRow][4] != "")  {
      const msg = sendMessage({ chat_id: CHAT_ID, text});
    } else {
      console.log("Line is not filled");
    }

  } else {
    console.log("Table changes do not require notification: " + triggerCol);
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