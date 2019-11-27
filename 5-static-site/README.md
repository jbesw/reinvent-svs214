# SVS214 - Example 5 - Single-page application website

This code was presented at re:Invent 2019, session ID SVS214.

This contains a simple Vue front-end using API Gateway to retrieve a list of data from a DynamoDB table.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [Amazon Transcribe pricing page](https://aws.amazon.com/transcribe/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 12.x installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.
2. Deploy the frontend using Amplify Console.
3. Deploy the backend using SAM, from the backend directory:
```
sam package --output-template-file packaged.yaml --s3-bucket <<enter deployment bucket name>>
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name example5-website --region us-east-1
```

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0