function doGet() {
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const sheetName = 'Guest List'; // đổi theo sheet của bạn
    const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);

    // Kiểm tra nếu sheet không tồn tại, tạo mới
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActive().insertSheet(sheetName);
      // Thêm header row nếu sheet mới (tiếng Việt)
      newSheet.appendRow(['Thời gian', 'Tên', 'Email', 'Trạng thái', 'User Agent', 'IP Address']);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, message: 'Sheet created' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Xử lý dữ liệu từ request
    let body = {};
    
    // Kiểm tra nếu có postData (JSON)
    if (e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (err) {
        // Nếu không parse được JSON, thử form-encoded
        body = e.parameter || {};
      }
    } else {
      // Nếu không có postData, đọc từ parameter (form-encoded)
      body = e.parameter || {};
    }

    // Lấy các giá trị từ body
    const now = new Date();
    const name = (body.name || '').trim();
    const email = (body.email || '').trim(); // Đảm bảo email được lấy đúng
    const status = (body.status || '').trim();
    const ua = (body.ua || body.userAgent || navigator.userAgent || '').trim();
    
    // Lấy IP address từ các nguồn khác nhau
    const ip = (e.parameter && e.parameter.ip) ||
               (e.request && e.request.headers && e.request.headers['x-forwarded-for']) ||
               (e.request && e.request.headers && e.request.headers['x-real-ip']) ||
               '';

    // Kiểm tra header row - nếu sheet trống, thêm header (tiếng Việt)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Tên', 'Email', 'Trạng thái', 'User Agent', 'IP Address']);
    } else {
      // Kiểm tra xem có cột Email chưa - nếu chưa có thì thêm vào
      const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const emailColumnIndex = headerRow.indexOf('Email');
      
      // Nếu chưa có cột Email, thêm vào sau cột "Tên"
      if (emailColumnIndex === -1) {
        const tenColumnIndex = headerRow.indexOf('Tên');
        if (tenColumnIndex !== -1) {
          // Chèn cột Email sau cột Tên
          sheet.insertColumnAfter(tenColumnIndex + 1);
          sheet.getRange(1, tenColumnIndex + 2).setValue('Email');
        }
      }
    }

    // Lấy index của các cột từ header
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const timeCol = headerRow.indexOf('Thời gian') + 1;
    const nameCol = headerRow.indexOf('Tên') + 1;
    const emailCol = headerRow.indexOf('Email') + 1;
    const statusCol = headerRow.indexOf('Trạng thái') + 1;
    const uaCol = headerRow.indexOf('User Agent') + 1;
    const ipCol = headerRow.indexOf('IP Address') + 1;

    // Tìm hàng tiếp theo để thêm dữ liệu
    const nextRow = sheet.getLastRow() + 1;
    
    // Thêm dữ liệu vào đúng cột
    if (timeCol > 0) sheet.getRange(nextRow, timeCol).setValue(now);
    if (nameCol > 0) sheet.getRange(nextRow, nameCol).setValue(name);
    if (emailCol > 0) sheet.getRange(nextRow, emailCol).setValue(email);
    if (statusCol > 0) sheet.getRange(nextRow, statusCol).setValue(status);
    if (uaCol > 0) sheet.getRange(nextRow, uaCol).setValue(ua);
    if (ipCol > 0) sheet.getRange(nextRow, ipCol).setValue(ip);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        ok: true, 
        data: { name, email, status, timestamp: now.toISOString() }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    Logger.log('Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        ok: false, 
        error: String(err),
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

