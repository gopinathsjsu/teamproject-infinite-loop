const QRCode = require('qrcode');
const { uploadToS3, getUrl } = require('./S3');

const generateAndPingQRCode = async (transactionId, urlToPing) => {
    const url = '/verifyTicket/' + transactionId;
    const filepath = './qrcode.png';
    QRCode.toFile(filepath, url, async (err) => {
        if (err) throw err;

        console.log('QR Code saved as qrcode.png');
    });
    link = await uploadToS3(filepath, transactionId);
    // console.log(link);
    url_aws = await getUrl(link.key)
    return url_aws;
};

// Replace '123456789' with the actual transaction ID and 'YOUR_URL_TO_PING' with the actual URL to ping
// generateAndPingQRCode('123456789', 'YOUR_URL_TO_PING');
exports.generateAndPingQRCode = generateAndPingQRCode;