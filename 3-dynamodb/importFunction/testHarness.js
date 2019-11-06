  
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

const { handler } = require('./app')

const event = {
  "Records": [
      {
          "eventVersion": "2.1",
          "eventSource": "aws:s3",
          "awsRegion": "us-east-1",
          "eventTime": "2019-11-04T21:51:25.669Z",
          "eventName": "ObjectCreated:Put",
          "s3": {
              "s3SchemaVersion": "1.0",
              "configurationId": "5e6c64f2-3785-48ff-a81a-0895a56bbd9a",
              "bucket": {
                  "name": "jbesw-sam-importddb",
                  "ownerIdentity": {
                      "principalId": "ASRUZ4ZWI5GFR"
                  },
                  "arn": "arn:aws:s3:::jbesw-sam-importddb"
              },
              "object": {
                  "key": "locations.json",
                  "size": 1574825,
                  "eTag": "dc33000a831d60c154f29e7b6cb026ee",
                  "sequencer": "005DC09D5D8CAE3C46"
              }
          }
      }
  ]
}

const main = async () => {
  await handler(event)
}

main()