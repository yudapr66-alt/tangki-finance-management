/**
 * Tambahkan fungsi ini ke Code.gs yang sudah ada.
 * Jangan mengganti doGet() atau fungsi database/CRUD yang sudah berjalan.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Body permintaan kosong.');
    }

    var request = JSON.parse(e.postData.contents);
    if (!request || typeof request !== 'object' || Array.isArray(request)) {
      throw new Error('Format permintaan tidak valid.');
    }

    var payload = request.payload || {};
    var result;

    switch (request.action) {
      case 'getFormConfig':
        result = getFormConfig();
        break;
      case 'getSheetOptions':
        result = getSheetOptions(payload.month);
        break;
      case 'getDashboardData':
        result = getDashboardData(payload.month);
        break;
      case 'saveTransaction':
        result = saveTransaction(payload);
        break;
      case 'updateTransaction':
        result = updateTransaction(payload);
        break;
      case 'deleteTransaction':
        result = deleteTransaction(payload);
        break;
      default:
        throw new Error('Aksi API tidak dikenal.');
    }

    return tangkiJsonResponse_({ success: true, data: result });
  } catch (error) {
    console.error('doPost: ' + (error && error.stack ? error.stack : error));
    return tangkiJsonResponse_({
      success: false,
      error: error && error.message ? error.message : 'Permintaan API gagal.'
    });
  }
}

function tangkiJsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
