require('dotenv').config()
const fs = require('fs')
const express = require('express');
const app = express();
const cors = require('cors');
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET
const signatureVersion = 'v4'
app.use(cors());

AWS.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: region,

});
const s3 = new AWS.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: bucketName,
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
});

exports.upload = upload;



// uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

function getUrl(key) {

    AWS.config = new AWS.Config({
        accessKeyId,
        secretAccessKey,
        region,
        signatureVersion
    })
    const s3 = new AWS.S3();

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
    })
    return url;
}
exports.getUrl = getUrl;
// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
const uploadToS3 = async (filePath, id) => {
    const s3 = new AWS.S3();

    const params = {
        Bucket: bucketName,
        Key: '/qrcode' + id + '.png',
        Body: fs.createReadStream(filePath),
        ContentType: 'image/png', // Adjust the content type accordingly
    };
    console.log("here");
    return s3.upload(params).promise();
};
exports.uploadToS3 = uploadToS3;