/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import pkg from 'aws-sdk';
const { config, DynamoDB } = pkg;

config.update({
  accessKeyId: 'AKIAQSSWGXK7MCYRYIH7' ,
  secretAccessKey: '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' ,
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new DynamoDB();

var params = {
    TableName : "GitHub_Projects",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
        { AttributeName: "owner_name", KeyType: "RANGE" }  //Sort key       
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "owner_name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});