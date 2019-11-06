# Example 1 - S3 Auto-Translator

The S3 Auto-Translator will automatically convert uploaded objects into other languages specified by the user, using Amazon Translate.

Important: this application uses Amazon Translate and there are costs associated with this service after the Free Tier usage - please see the   [Amazon Translate pricing page](https://aws.amazon.com/translate/pricing/) for details.

```bash
.
├── README.MD                   <-- This instructions file
├── translatorFunction          <-- Source code for a lambda function
│   └── app.js                  <-- Main Lambda handler
│   └── s3.js                   <-- S3 helper functions
│   └── translate.js            <-- Wrapper for Amazon Translate service
│   └── testHarness.js          <-- For testing code locally
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
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name example1-translate --region us-east-1 --parameter-overrides InputBucketName=<<enter translation bucket name>> TargetLanguage="<< languages >>"
```

## Parameter Details

* Target Language: a space-separated list of languages to translate the original text into (e.g. "fr es de")
* InputBucketName: the unique name of a new S3 bucket for this application (bucket names must be lowercase only and globally unique across AWS)

## How it works

* Upload a text file (ending in the suffix '.txt') to the target S3 bucket.
* After a few seconds you will see translation files appearing in the 'translations' folder in the same bucket.
* This application only works for text file up to 5000 characters (anything longer is truncated, so the translated output file will also be truncated).
* Output files are stored in a "translations" folder in the bucket, using the same file structure.

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0