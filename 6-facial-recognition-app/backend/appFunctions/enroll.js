'use strict'

const { addFace, findFace } = require('./lib/rekognition')
const { saveToDynamoDB } = require('./lib/dynamodb')
const CollectionId = process.env.CollectionId
const TableName = process.env.DDBtable
const FaceMatchThreshold = 80

// Checks if face is already known - if not, enrolls in collection.
// Possible result values:
// - EXISTING: face is already in the collection
// - INDEXED: face is successfully indexed.
// - NO_FACES: no faces are found in the image.

exports.handler = async (event) => {
    await enrollFace(event)
    return { statusCode: 200 }
}

const enrollFace = async (event) => {
    const Bucket = event.Records[0].s3.bucket.name
    const Name = event.Records[0].s3.object.key
    const ExternalImageId = Name.replace('enroll/','')
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
    } catch (err) {
        // Throws error if no faces in the picture - log in DDB and exit
        await saveToDynamoDB({
            TableName,
            Item: {
                ID: ExternalImageId,
                mode: 'enroll',
                result: 'NO_FACES',
                rekognition: {}
            }
        })
        return { statusCode: 200 }
    }

    // Determine result
    if (findFaceResult.FaceMatches.length > 0) {
        console.log('Already in collection: ', findFaceResult.FaceMatches.length)
        result = 'EXISTING'
    } else {
        const addFaceResult = await addFace({
            CollectionId,
            Image: {
                S3Object: {
                    Bucket,
                    Name
                }
            },
            ExternalImageId,
            DetectionAttributes: ['ALL']
        })
        result = 'INDEXED'
        console.log(JSON.stringify(addFaceResult, null, 2))
        findFaceResult = addFaceResult
    }

    // Save Rekognition info to DDB
    console.log('ddbResult: ', await saveToDynamoDB({
        TableName,
        Item: {
            ID: ExternalImageId,
            mode: 'enroll',
            result,
            rekognition: findFaceResult
        }
    }))
}