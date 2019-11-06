'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
const ddb = new AWS.DynamoDB.DocumentClient()

const saveToDynamoDB = async (params) => {
    console.log('saveToDynamoDB called: ', params)

    let result
    try {
        result = await ddb.put(params).promise()
    } catch(err) {
        console.error('saveToDynamoDB', err)
    }
    return result
}

module.exports = { saveToDynamoDB }
