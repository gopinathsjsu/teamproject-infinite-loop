const QRCode = require('qrcode');

const generateAndPingQRCode = async (transactionId, urlToPing) => {
    const url = `https://www.youtube.com/`;

    QRCode.toFile('./qrcode.png', url, async (err) => {
        if (err) throw err;

        console.log('QR Code saved as qrcode.png');

        // Make an HTTP request when the QR code is scanned
        try {
            // const response = await axios.get(urlToPing);
            console.log('URL Pinged:', response.data);
        } catch (error) {
            console.error('Error Pinging URL:', error.message);
        }
    });
};

// Replace '123456789' with the actual transaction ID and 'YOUR_URL_TO_PING' with the actual URL to ping
// generateAndPingQRCode('123456789', 'YOUR_URL_TO_PING');
exports.generateAndPingQRCode = generateAndPingQRCode;