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
import { readFileSync } from 'fs';

config.update({
  accessKeyId: 'AKIAQSSWGXK7MCYRYIH7' ,
  secretAccessKey: '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' ,
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var docClient = new DynamoDB.DocumentClient();

console.log("Importing github projects into DynamoDB. Please wait.");

var allGitHubProjects = JSON.parse(readFileSync( 'data/GitHub_Projects.json', 'utf8'));
allGitHubProjects.forEach(function(project) {
    var params = {
        TableName: "GitHub_Projects",
        Item: {
            "Description": project.Description,
            "Topics": project.Topics,
            "api_url":  project.api_url,
            "created_at":  project.created_at,
            "default_branch":  project.default_branch,
            "forks_count":  project.forks_count,
            "homepage_url":  project.homepage_url,
            "id":  project.id,
            "is_forked":  project.is_forked,
            "is_private":  project.is_private,
            "language":  project.language,
            "license":  project.license,
            "master_branch":  project.master_branch,
            "model_files":  project.model_files,
            "num_model_files":  project.num_model_files,
            "open_issues_count":  project.open_issues_count,
            "owner_name":  project.owner_name,
            "project_url":  project.project_url,
            "pushed_at":  project.pushed_at,
            "repo_name":  project.repo_name,
            "size_in_kb":  project.size_in_kb,
            "stargazers_count":  project.stargazers_count,
            "updated_at":  project.updated_at,
            "version_sha":  project.version_sha,
            "watchers_count":  project.watchers_count
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add project", project.owner_name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", project.owner_name);
       }
    });
});