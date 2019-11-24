# SVS214 - Example 6 - Face matching app

This code was presented at re:Invent 2019, session ID SVS214.

The face matching app  lets you enroll and verify faces uploaded to an S3 bucket, using Amazon Rekognition.

The backend portion of the code configures the Lambda functions that comprise the API for the frontend, and the triggers between the S3 bucket, Rekognition and DynamoDB. 

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [Amazon Transcribe pricing page](https://aws.amazon.com/transcribe/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

```bash
.
├── README.MD                   <-- This instructions file
├── appFunctions                <-- Source code for a lambda function
│   └── lib                     <-- Common library
│   └──── dynamodbdb.js         <-- DynamoDB helper functions
│   └──── rekognition.js        <-- Rekognition helper functions
│   └── checkStatus.js          <-- Check status function
│   └── enroll.js               <-- Enrollment function
│   └── upload.js               <-- Upload function
│   └── verify.js               <-- Verify status function
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.

1. From the command line, run:
```
sam package --output-template-file packaged.yaml --s3-bucket <<enter deployment bucket name>>
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name example6-facematcher --region us-east-1 --parameter-overrides InputBucketName=<<enter translation bucket name>>
```

## Parameter Details

* InputBucketName: the unique name of a new S3 bucket for this application (bucket names must be lowercase only and globally unique across AWS)

## How it works

* Upload an MP3 file of a person speaking (ending in the suffix '.mp3') to the target S3 bucket.
* After a few seconds you will see a transcription file in the same bucket (using the same object name with .json appended).
* This triggers a sentiment analysis with Amazon Comprehend and the result is stored in an Amazon DynamoDB table.

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0