require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const Aws = require('aws-sdk')
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET
const signatureVersion='v4'


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

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

function getUrl(key){

  Aws.config = new Aws.Config({ 
      accessKeyId,
      secretAccessKey,
      region,
      signatureVersion
  })
  const s3 = new Aws.S3();
  
  const url = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires:30*60
  })
  return '';
}
exports.getUrl=getUrl;
// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream