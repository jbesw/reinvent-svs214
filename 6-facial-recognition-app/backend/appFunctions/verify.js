'use strict'

const { findFace } = require('./lib/rekognition')
const { saveToDynamoDB } = require('./lib/dynamodb')
const CollectionId = process.env.CollectionId
const TableName = process.env.DDBtable
const FaceMatchThreshold = 80

exports.handler = async (event) => {
    await verifyFace(event)
    return { statusCode: 200 }
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
