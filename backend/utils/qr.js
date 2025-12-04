// utils/qr.js
const qrcode = require('qrcode');

async function generateQrDataUrl(text) {
  return qrcode.toDataURL(text);
}

module.exports = { generateQrDataUrl };
