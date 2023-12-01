const QRCode = require('qrcode');
const { uploadToS3, getUrl } = require('./S3');
const fs = require('fs');


const generateAndPingQRCode = async (transactionId) => {
    const url = '/verifyTicket/' + transactionId;
    console.log(url);
    const filepath = './qrcode' + transactionId + '.png';
    await QRCode.toFile(filepath, url, async (err) => {
        if (err) {
            console.log(err);
        };

        console.log('QR Code saved as qrcode.png');
    });
    link = await uploadToS3(filepath, transactionId);
    // console.log(link);
    url_aws = await getUrl(link.key)
    fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) {
            console.error('Error deleting local file:', unlinkErr);
        } else {
            console.log('Local file deleted successfully.');
        }
    });
    return link.key;
};

// Replace '123456789' with the actual transaction ID and 'YOUR_URL_TO_PING' with the actual URL to ping
// generateAndPingQRCode('123456789', 'YOUR_URL_TO_PING');
exports.generateAndPingQRCode = generateAndPingQRCode;