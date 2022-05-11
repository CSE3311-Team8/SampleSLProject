
/*DELETE ALL KEYS IN THESE FILES AFTER CREATING TABLES, YOUR SECRET KEYS WILL BE EXPOSED IF YOU PUSH THEM TO GitHub*/
import pkg from 'aws-sdk';
const { config, DynamoDB } = pkg;
import { readFileSync } from 'fs';

config.update({
  accessKeyId: 'KEY' ,
  secretAccessKey: 'KEY' ,
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var docClient = new DynamoDB.DocumentClient();

console.log("Importing MATC projects into DynamoDB. Please wait.");

var allMATCProjects = JSON.parse(readFileSync( '../data/MATC_Projects.json', 'utf8'));
allMATCProjects.forEach(function(project) {
    var params = {
        TableName: "Table Name Here",
        Item : {
            "author_name": project.author_name,
            "author_uri": project.author_uri,
            "average_rating": project.average_rating,
            "category": "",
            "content": project.content,
            "download_link": project.download_link,
            "downloads": project.downloads,
            "id": project.id,
            "license": project.license,
            "mathworks_url": project.mathworks_url,
            "model_files": project.model_files,
            "no_of_comments": project.no_of_comments,
            "no_of_ratings": project.no_of_ratings,
            "num_model_file": project.num_model_file,
            "published": project.published,
            "summary": project.summary,
            "title": project.title,
            "updated": project.updated
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