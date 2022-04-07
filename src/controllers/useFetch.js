import { useState } from "react";
import { useEffect } from "react";

import pkg from "aws-sdk";

const { config, DynamoDB } = pkg;
//const { unmarshall } = require("@aws-sdk/util-dynamodb");

const useFetch = (repository, word) => {
  //const pageLimit = 40;
  //const pageLimitAll = 40;
  //const [page, setPage] = useState(1);
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //will execute function when data is updated
  useEffect(() => {
    config.update({
      accessKeyId: "",
      secretAccessKey: "",
      region: "",
      endpoint: "",
    });
    //console.log("word in useEffect is " + word)
   // const dynamoDB = new DynamoDB();

    if (repository === "GitHub" && word !== "") {
      /**************This method of scanning/searching in description works******/
      const documentClient = new DynamoDB.DocumentClient();
      const params = {
        TableName: "GitHubProject",
        ScanIndexForward: true,
      
        FilterExpression: "contains(#DYNOBASE_Description, :Description)",
        ExpressionAttributeNames: {
          "#DYNOBASE_Description": "Description",
        },
        ExpressionAttributeValues: {
          ":Description": `${word}`,
        },
      };

      async function fetchData() {
        const results = await documentClient.scan(params).promise().catch(err => console.log(err));
        console.log(results);
        setItems(results.Items);
        setLoading(false);
      }
      fetchData();

     
    } else if (repository === "MATC" && word !=="") {
      const documentClient = new DynamoDB.DocumentClient();
      const params = {
        TableName: "MATCProject",
        ScanIndexForward: true,
        
        FilterExpression: "contains(#DYNOBASE_summary, :summary)",
        ExpressionAttributeNames: {
          "#DYNOBASE_summary": "summary",
        },
        ExpressionAttributeValues: {
          ":summary": `${word}`,
        },
      };

      async function fetchData() {
        const results = await documentClient.scan(params).promise().catch(err => console.log(err));
        console.log(results);
        setItems(results.Items);
        setLoading(false);
      }
      fetchData();
      setLoading(false);
    } else if (repository === "TYPE") {
      alert("Select repository type to begin search...");
    }
  }, [word, repository]);

  return { datas, isLoading };
};

export default useFetch;

/*****^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^***************/

/*************This method used standard SQL SELECT statements, it returns and dynamobd ojbect*/
/*Dynamodb object must be unmarshalled into standard JSON format for this project to work*/

// const results = await documentClient.scan(params).promise();
// async function queryWithPartiQL1({ search }) {
//   const statement = `SELECT * FROM GitHubProject WHERE "forks_count" > ${word}`;
//   const results = await dynamoDB
//     .executeStatement({ Statement: statement })
//     .promise()
//     .catch((err) => console.error(err));
//   console.log(results.Items.length);
//   let tracker = [];
//   var i = 0;
//   //get size of object so you can loop through exactly
//   for (i = 0; i < results.Items.length; i++) {
//     console.log(entered);
//     tracker.push(unmarshall(results.Items[i]));
//   }
//   console.log(tracker);
// }
// queryWithPartiQL1({ word });
//
