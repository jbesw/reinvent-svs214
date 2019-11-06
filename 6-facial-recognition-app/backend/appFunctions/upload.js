const uuidv4 = require('uuid/v4')
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

const uploadBucket = process.env.UploadBucket

exports.handler = async (event, context) => {
    console.log('Started:' , JSON.stringify(event, null, 2))
    if (!event.queryStringParameters || !event.queryStringParameters.mode) return
    // use the mode from pathParameters
    return await getUploadURL(event.queryStringParameters.mode)
}

const getUploadURL = async function(mode) {
    console.log('getUploadURL started: ', mode)
    const actionId = uuidv4()
  
    const s3Params = {
      Bucket: uploadBucket,
      Key:  `${mode}/${actionId}.jpg`,
      ContentType: 'image/jpeg',
      CacheControl: 'max-age=31104000',
      ACL: 'public-read',
    }
  
    return new Promise((resolve, reject) => {
      // Get signed URL
      const uploadURL = s3.getSignedUrl('putObject', s3Params)
      resolve({
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            uploadURL: uploadURL,
            photoFilename: `${actionId}.jpg`
        })
      })
    })
  }
  