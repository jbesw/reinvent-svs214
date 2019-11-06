# Example 1 - S3 Auto-Transcriber

The S3 Auto-Transcriber will automatically convert uploaded MP3 files into transcribed text, using Amazon Transcribe.

Important: this application uses Amazon Transcribe and there are costs associated with this service after the Free Tier usage - please see the   [Amazon Transcribe pricing page](https://aws.amazon.com/transcribe/pricing/) for details.

```bash
.
├── README.MD                   <-- This instructions file
├── transcribeFunction          <-- Source code for a lambda function
│   └── app.js                  <-- Main Lambda handler
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
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name example2-transcribe --region us-east-1 --parameter-overrides InputBucketName=<<enter translation bucket name>>
```

## Parameter Details

* InputBucketName: the unique name of a new S3 bucket for this application (bucket names must be lowercase only and globally unique across AWS)

## How it works

* Upload an MP3 file of a person speaking (ending in the suffix '.mp3') to the target S3 bucket.
* After a few seconds you will see a transcription file in the same bucket (using the same object name with .json appended).
* The job name must be unique. This is the same as the object name, so uploading the same object more than once will not trigger more than one transcription job.

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0