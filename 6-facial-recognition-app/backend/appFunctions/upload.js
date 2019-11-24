/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'

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
  