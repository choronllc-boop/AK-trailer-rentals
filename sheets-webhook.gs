// Google Apps Script webhook for AK Trailer Rentals form submissions.
// The site POSTs JSON like { kind: "contact"|"booking", ...fields } from
// submitForm() in src/lib/actions.ts (SHEETS_WEBHOOK_URL env var).
//
// Contact submissions land in the "Contact Us" tab, reservations in the
// "Reservations" tab. Tabs and header rows are created automatically.

var FORMS = {
  contact: {
    sheetName: "Contact Us",
    headers: ["Received", "Name", "Phone", "Email", "Trailer", "Pickup Date", "Return Date", "Message"],
    row: function (d) {
      return [new Date(), d.name, d.phone, d.email, prettify(d.trailerType), d.pickupDate, d.returnDate, d.message];
    },
  },
  booking: {
    sheetName: "Reservations",
    headers: ["Received", "Name", "Phone", "Email", "Trailer", "Start Date", "End Date", "Pickup or Delivery"],
    row: function (d) {
      return [new Date(), d.name, d.phone, d.email, prettify(d.trailer), d.startDate, d.endDate, prettify(d.fulfillment)];
    },
  },
};

// "wood-deck-car-hauler" -> "Wood Deck Car Hauler", "not-sure" -> "Not Sure"
function prettify(slug) {
  if (!slug) return "";
  return String(slug)
    .split("-")
    .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
    .join(" ");
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var config = FORMS[data.kind] || FORMS.contact;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName) || ss.insertSheet(config.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(config.headers);
    sheet.getRange(1, 1, 1, config.headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, config.headers.length, 150);
    // Message column on the contact tab gets extra room.
    if (config === FORMS.contact) sheet.setColumnWidth(config.headers.length, 320);
  }

  var row = config.row(data).map(function (v) { return v == null ? "" : v; });
  sheet.appendRow(row);

  var last = sheet.getLastRow();
  sheet.getRange(last, 1).setNumberFormat('MM/dd/yyyy h:mm AM/PM');
  sheet.getRange(last, 1, 1, config.headers.length).setVerticalAlignment("top").setWrap(true);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
