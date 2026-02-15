const SHEET_NAME = "Responses";
// Optional: set this when using standalone Apps Script.
// Spreadsheet URL format: https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
const SPREADSHEET_ID = "";

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    const row = [
      new Date(),
      valueOrDash_(data.fbLink),
      valueOrDash_(data.access),
      valueOrDash_(data.adAccount),
      valueOrDash_(data.lineId),
      valueOrDash_(data.hasAdmin),
      valueOrDash_(data.inbox),
      valueOrDash_(data.booking),
      valueOrDash_(data.signup),
      valueOrDash_(data.fullReason),
      valueOrDash_(data.location),
      valueOrDash_(data.decision),
      valueOrDash_(data.timeSlot),
      valueOrDash_(data.budget)
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "fbLink",
        "access",
        "adAccount",
        "lineId",
        "hasAdmin",
        "inbox",
        "booking",
        "signup",
        "fullReason",
        "location",
        "decision",
        "timeSlot",
        "budget"
      ]);
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim()) {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      "No active spreadsheet found. Set SPREADSHEET_ID in script for standalone deployments."
    );
  }
  return active;
}

function valueOrDash_(v) {
  if (v === null || v === undefined || v === "") return "-";
  return v;
}
