import { useState } from "react";
import { useEffect } from "react";
import pkg from "aws-sdk";

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
  stateTracker
) => {
  const [datas, setItems] = useState([]); //this data is the final product for rendering tables
  const [isLoading, setLoading] = useState(false); //loading tracker

  //will execute function when data is updated
  useEffect(() => {
    config.update({
      accessKeyId: "",
      secretAccessKey: "",
      region: "",
      endpoint: "",
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
            "contains(#DYNOBASE_Description, :Description) AND #DYNOBASE_forks_count >= :forks_count AND #DYNOBASE_open_issues_count >= :open_issues_count AND #DYNOBASE_stargazers_count >= :stargazers_count AND #DYNOBASE_watchers_count >= :watchers_count AND #DYNOBASE_langugae = :langugae AND #DYNOBASE_license = :license AND #DYNOBASE_published >= :published AND #DYNOBASE_updated <= :updated",
          ExpressionAttributeNames: {
            "#DYNOBASE_Description": "Description",
            "#DYNOBASE_forks_count": "forks_count",
            "#DYNOBASE_open_issues_count": "open_issues_count",
            "#DYNOBASE_stargazers_count": "stargazers_count",
            "#DYNOBASE_watchers_count": "watchers_count",
            "#DYNOBASE_published": "published",
            "#DYNOBASE_updated": "updated",
            "#DYNOBASE_langugae": "langugae",
            "#DYNOBASE_license": "license",
          },
          ExpressionAttributeValues: {
            ":Description": `'${word}'`,
            ":forks_count": `${forks_count}`,
            ":open_issues_count": `${open_issues_count}`,
            ":stargazers_count": `${stargazers_count}`,
            ":watchers_count": `${watchers_count}`,
            ":published": `'${start_date}'`,
            ":updated": `'${end_date}'`,
            ":langugae": `'${language}'`,
            ":license": `'${license}'`,
          },
        };

        const results = await documentClient.scan(params).promise().catch(err => console.log(err));
        //console.log(results);
        //setItems(results.Items);
      }
      fetchData();
      setLoading(false);
    }
    else if (repository === "TYPE") {
      alert("Select repository type to begin search...");
    }
  }, [word]);

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
