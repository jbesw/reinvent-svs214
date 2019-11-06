'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
const rekognition = new AWS.Rekognition()
// Documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html

// Expected:
// const params = {
//     CollectionId,
//     Image: {
//         'S3Object': {
//             Bucket,
//             Name
//         }
//     }
// }

const addFace = async (params) => {
    console.log('addFace called: ', params)
    return new Promise((resolve, reject) => {
        rekognition.indexFaces (params, function (err, data) {
            if (err) {
                console.error('addFace error: ', err)
                reject(err)
            }
            else {
                console.log('addFace complete: ', data)
                resolve(data)
            }
        })    
    })
}

// Expected:
//  var params = {
//   CollectionId: "myphotos", 
//   FaceMatchThreshold: 95, 
//   Image: {
//   S3Object: {
//     Bucket: "mybucket", 
//     Name: "myphoto"
//   }
//   }, 
//   MaxFaces: 5
//  };

const findFace = async (params) => {
    console.log('searchFacesByImage called: ', params)
    return new Promise((resolve, reject) => {
        rekognition.searchFacesByImage (params, function (err, data) {
            if (err) {
                console.error('addFace error: ', err)
                reject(err)
            }
            else {
                console.log('addFace complete: ', data)
                resolve(data)
            }
        })    
    })
}

module.exports = { addFace, findFace }

