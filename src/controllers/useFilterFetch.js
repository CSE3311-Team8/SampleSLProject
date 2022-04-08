import { useState } from "react";
import { useEffect } from "react";
import pkg from "aws-sdk";
import { isCompositeComponent } from "react-dom/test-utils";

const { config, DynamoDB } = pkg; //contains DocumentClient to unmarshall into correct JSON format

/****include this package when using standard SQL SELECT statement requests******/
//const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const useFilterFetch = (
  repository,
  word,
  start_date,
  end_date,
  language,
  license,
  forks_count,
  open_issues_count,
  stargazers_count,
  number_of_comments,
  watchers_count,
  number_of_ratings,
  filterState,
  max_forks_count,
  max_open_issues_count,
  max_stargazers_count,
  max_watchers_count,
  max_number_of_comments,
  max_number_of_ratings
) => {
  const [datas, setItems] = useState([]); //this data is the final product for rendering tables
  const [isLoading, setLoading] = useState(false); //loading tracker

  //will execute function when data is updated
  useEffect(() => {
    config.update({
      region: "us-east-1",
      endpoint: "dynamodb.us-east-1.amazonaws.com",
    });


    /*************This method uses standard SQL SELECT statements, it returns a dynamobd ojbect*/
    /*Dynamodb object must be unmarshalled into standard JSON format for this project to work*/
    if (repository === "GitHub" && word !== "") {
      async function fetchData() {
        const documentClient = new DynamoDB.DocumentClient();
        const params = {
          TableName: "GitHubProject",
          ScanIndexForward: true,
          FilterExpression:
            "contains(Description, :Description) AND forks_count >= :forks_count AND forks_count <= :maxForks AND open_issues_count >= :open_issues_count AND open_issues_count <= :maxIssues AND stargazers_count >= :stargazers_count AND stargazers_count <= :maxStarGazers AND watchers_count >= :watchers_count AND watchers_count <= :maxWatchers AND created_at >= :created_at AND updated_at <= :updated_at",

          ExpressionAttributeValues: {
            ":Description": `${word}`,
            ":forks_count": forks_count,
            ":open_issues_count": open_issues_count,
            ":stargazers_count": stargazers_count,
            ":watchers_count": watchers_count,
            ":created_at": `${start_date}`,
            ":updated_at": `${end_date}`,
            ":maxForks": max_forks_count,
            ":maxIssues": max_open_issues_count,
            ":maxStarGazers": max_stargazers_count,
            ":maxWatchers": max_watchers_count,
          },
        };

        const results = await documentClient
          .scan(params)
          .promise()
          .catch((err) => console.log(err));
        console.log(results);
        setItems(results.Items);
      }
      fetchData();
      setLoading(false);
    } else if (repository === "MATC" && word !== "") {
      async function fetchData() {
        const documentClient = new DynamoDB.DocumentClient();
        const params = {
          TableName: "MATCProject",
          //ProjectionExpression: "title, downloads, summary, author_uri, author_name, id, license, mathworks_url, no_of_comments, no_of_ratings, published, updated",
          FilterExpression:
            "contains(summary, :summary) AND published >= :published AND updated <= :updated AND downloads >= :downloads AND no_of_comments >= :no_of_comments AND no_of_comments <= :maxComments AND no_of_ratings >= :no_of_ratings AND no_of_ratings <= :maxRatings",
          ScanIndexForward: true,
          ExpressionAttributeValues: {
            ":summary": `${word}`,
            ":published": `${start_date}`,
            ":updated": `${end_date}`,
            ":no_of_ratings": number_of_ratings,
            ":downloads": `${forks_count}`,
            ":no_of_comments": number_of_comments,
            ":maxComments": max_number_of_comments,
            ":maxRatings": max_number_of_ratings
          },
        };

        const results = await documentClient
          .scan(params)
          .promise()
          .catch((err) => console.log(err));
        console.log(results);
        setItems(results.Items);
      }
      fetchData();
      setLoading(false);
    } else if (repository === "TYPE") {
      alert("Select repository type to begin search...");
    }
  }, [filterState]);

  return { isLoading, datas };
};

export default useFilterFetch;

// const dynamoDB = new DynamoDB();
// //const results = await documentClient.scan(params).promise();
// async function queryWithPartiQL1({ search }) {
//   const statement = `SELECT * FROM GitHubProject WHERE contains("Description" ,'${word}
//                       AND "forks_count" >= ${forks_count} AND "stargazers_count" >= ${stargazers_count}
//                       AND "language" = ${language} AND "license" = ${license} AND
//                       "open_issues_count" >= ${open_issues_count} AND "watchers_count" >= ${watchers_count}') `;
//   const results = await dynamoDB
//     .executeStatement({ Statement: statement })
//     .promise()
//     .catch((err) => console.error(err));
//   console.log(results.Items.length);
//   let tracker = [];
//   var i = 0;
//   //get size of object so you can loop through exactly
//   for (i = 0; i < results.Items.length; i++) {
//     //console.log(entered);
//     tracker.push(unmarshall(results.Items[i]));
//   }
//   console.log(tracker);
//   setItems(tracker);
// }
// queryWithPartiQL1({ word });
/************^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^**********************/
