// スクリプトID 「1VCWhTnCQ7vNSp1RVRmUfGgR22ROBPZ3JC-N3hXg3jwhKN1XVG4qy9Yuj」

function myFunctionScript() {
  var d = new Date();
  var week_number = d.getDay()
  var mon = d.getMonth() + 1;
  Logger.log("今日の曜日ナンバー :　"+week_number)

  if (week_number == 0) {
    var d2 = d.getDate() - 2;
  } else if (week_number == 6) {
    var d2 = d.getDate() - 1;
  } else {
    var d2 = d.getDate();
  };

  var now = mon + "/" + d2;
  Logger.log("今日の日付 :  "+ now);

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var sheet_number = spreadsheet.getSheets()[0];
  var textFinder = sheet.createTextFinder(now);
  var cells = textFinder.findAll();
  for (var i = 0; i < cells.length; i++) {
    var sell_number = cells[i].getA1Notation();
    if (week_number == 0 || week_number == 6) {
      var list_Column = ("ABCDEFG");
      var sell_number = cells[i].getA1Notation();
      var split_numbers = sell_number.split("");
      var split_number = (split_numbers[0]);
      var sell_number_0_6 = list_Column.indexOf(split_number) + 1
      var sell_number_s_s = (list_Column[sell_number_0_6] + sell_number.slice(1));
      Logger.log("週末セル :  "+ sell_number_s_s)
      var newurl = spreadsheet.getUrl() + "#gid=" + sheet_number.getSheetId() + "&range=" + sell_number_s_s;
      SpreadsheetApp.getActiveSheet().getRange(sell_number_s_s).activate();
    } else {
      var newurl = spreadsheet.getUrl() + "#gid=" + sheet_number.getSheetId() + "&range=" + sell_number;
      SpreadsheetApp.getActiveSheet().getRange(sell_number).activate();
      Logger.log('平日セル :  ' + cells[i].getA1Notation());
    };
    Logger.log("コピーURL : " + newurl);
  };
  sheet.getRange("C1").setValue(newurl);
  sheet.getRange("B1").setValue("今日のURL ⇨⇨⇨⇨⇨⇨⇨⇨⇨");
};
