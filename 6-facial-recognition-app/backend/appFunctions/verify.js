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

const { findFace } = require('./lib/rekognition')
const { saveToDynamoDB } = require('./lib/dynamodb')
const CollectionId = process.env.CollectionId
const TableName = process.env.DDBtable
const FaceMatchThreshold = 80

exports.handler = async (event) => {
  const records = event.Records
  console.log (JSON.stringify(event, null, 2))

  try {
    await Promise.all(
      records.map(async (record) => {
      console.log('Incoming record: ', record)              
        await verifyFace(event)
      })
    )
  } catch (err) {
    console.error(err)
  }
}

const verifyFace = async (event) => {
  const Bucket = event.Records[0].s3.bucket.name
  const Name = event.Records[0].s3.object.key
  const ExternalImageId = Name.replace('verify/','')
  console.log(`Started: Bucket=${Bucket}; Name=${Name}`)
  
  let result = ''
  let findFaceResult = {}

  // Check if face already in the collection
  try {
    findFaceResult = await findFace({
      CollectionId, 
      FaceMatchThreshold, 
      Image: {
        S3Object: {
          Bucket, 
          Name
        }
      }, 
      MaxFaces: 1
    })
    console.log(JSON.stringify(findFaceResult, null, 2))
  } catch (err) {
    // Throws error if no faces in the picture - log in DDB and exit
    await saveToDynamoDB({
      TableName,
      Item: {
        ID: ExternalImageId,
        mode: 'verify',
        result: 'NO_FACES',
        rekognition: {}
      }
    })
    return { statusCode: 200 }
  }

  // Determine result
  result = (findFaceResult.FaceMatches.length === 0) ? 'NO_MATCH' : 'MATCH'

  // Save Rekognition info to DDB
  const ddbResult = await saveToDynamoDB ({
    TableName,
    Item: {
      ID: ExternalImageId,
      mode: 'verify',
      result,
      rekognition: findFaceResult
    }
  })
  console.log('ddbResult: ', ddbResult)
}
