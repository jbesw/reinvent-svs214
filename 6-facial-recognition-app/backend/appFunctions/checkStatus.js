'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
const ddb = new AWS.DynamoDB.DocumentClient()

// Take an image ID, return the matching Item from the DynamoDB table.

exports.handler = async (event) => {
    return checkStatus(event)
}

const checkStatus = async (event) => {
    if (!event.queryStringParameters || !event.queryStringParameters.photoFilename) return

    const ID = event.queryStringParameters.photoFilename
    console.log('Checking status for ', ID)

    const record = await ddb.get({
        TableName : process.env.DDBtable,
        Key: {
            ID
        }
    }).promise()

    console.log(record)

    return {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(record.Item)
    }
}