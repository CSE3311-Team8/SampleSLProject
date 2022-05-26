import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
///import pkg from "aws-sdk";
//import { isCompositeComponent } from "react-dom/test-utils";

//const { config, DynamoDB } = pkg; //contains DocumentClient to unmarshall into correct JSON format

/****include this package when using standard SQL SELECT statement requests******/
//const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const MATCFilterFetch = (
  repository,
  word,
  start_date,
  end_date,
  language,
  license,
  downloads,
  open_issues_count,
  stargazers_count,
  number_of_comments,
  watchers_count,
  number_of_ratings,
  filterState,
  maxDownloads,
  max_open_issues_count,
  max_stargazers_count,
  max_watchers_count,
  max_number_of_comments,
  max_number_of_ratings,
  setLoader,
  trigger,
  triggerState
) => {
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [nextTokenHolder, setNextTokenHolder] = useState("");
  const [stateTracker, setStateTracker] = useState("");
  var [holder1, setHolder1] = useState([]); //collects projecst as they are found

  const [filterTracker, setFilterTracker] = useState("");
  const [firstFetch, setFirstFetch] = useState(false);

  //query and fields requested
  const listMATCProjects = /* GraphQL */ `
  query listMATCProjects{
    listMATCProjects(limit: 250, filter: {
      summary: {contains: "${word}"}, 
      no_of_ratings: {ge: ${number_of_ratings}, le: ${max_number_of_ratings}}, 
      no_of_comments: {ge: ${number_of_comments}, le: ${max_number_of_comments}}, 
      published: {ge: "${start_date}", le: "${end_date}"}}){
      items {
      	id
        author_name
        author_uri
        average_rating
        content
        download_link
        downloads
        license
        mathworks_url
        model_files
        no_of_comments
        no_of_ratings
        num_model_files
        published
        summary
        title
        updated
      }
      nextToken
    }
  }
`;

  const listMATCProjectsToken = /* GraphQL */ `
query listMATCProjects{
  listMATCProjects(limit: 250, filter: {summary: {contains: "${word}"}, no_of_ratings: {ge: ${number_of_ratings}, le: ${max_number_of_ratings}}, no_of_comments: {ge: ${number_of_comments}, le: ${max_number_of_comments}}, published: {ge: "${start_date}", le: "${end_date}"}}, nextToken: "${nextToken}"){
    items {
      id
      author_name
      author_uri
      average_rating
      content
      download_link
      downloads
      license
      mathworks_url
      model_files
      no_of_comments
      no_of_ratings
      num_model_files
      published
      summary
      title
      updated
    }
    nextToken
  }
}
`;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //will execute function when data is updated

  useEffect(() => {
    //this will set the next token to empty when word is reset
    //this ensures tables are scanned from beginning and not last token scanned

    //third condition tracks the filter button to clear tokens when when looking for
    //same word with different parameters, e.g. more comments, more stargazers
    if (
      stateTracker === word &&
      filterTracker === repository &&
      triggerState === true
    ) {
      setNextTokenHolder("");
      setHolder1([]); //clears holder for new data
      setFirstFetch(false); //resets to fetch without token
      trigger(false); //returns button state to false
      setNextToken(""); //empties token
    }

    if (repository === "All" || repository === "MATC") {
      setLoading(true);
      //this tracks the incoming word for comparison with next request
      //if the incoming query is different than this state,
      //next token will be set to "" and search will begin from start of table

      async function fetchProjects() {
        if (stateTracker !== word || filterTracker !== repository) {
          setHolder1([]); //empties holder
          setNextToken(""); //empties token
          setFirstFetch(false);
        }
        setStateTracker(word);
        setFilterTracker(repository);
        try {
          if (firstFetch === false) {
            setFirstFetch(true);
            const projectData = await API.graphql(
              graphqlOperation(listMATCProjects)
            );
            const projects = projectData.data.listMATCProjects.items;
            //if there are no current projects to display or
            //if the list of projecst to display is less than 20
            //stack projects in holder until full and set the last place scanned
            if (holder1.length === 0 || holder1.length < 20) {
              setHolder1((holder1 = holder1.concat(projects))); //colledt projects
              setNextToken(projectData.data.listMATCProjects.nextToken); //last place scanned
            } else {
              //if the project holder is full, set the last token/place scanned
              setNextTokenHolder(projectData.data.listMATCProjects.nextToken);
              //setLoader(true);
            }
          } else if (firstFetch === true) {
            //this condition tracks which fetch to use, token or no token
            //this will execute a scan without a next token
            //this means word search bar was changed
            const projectData = await API.graphql(
              graphqlOperation(listMATCProjectsToken)
            );
            const projects = projectData.data.listMATCProjects.items;

            //if there are no current projects to display or
            //if the list of projecst to display is less than 20
            //stack projects in holder until full and set the last place scanned
            if (holder1.length === 0 || holder1.length < 11) {
              setHolder1((holder1 = holder1.concat(projects))); //colledt projects
              setNextToken(projectData.data.listMATCProjects.nextToken); //last place scanned
              //setLoader(true);
            } else {
              //if the project holder is full, set the last token/place scanned
              setNextTokenHolder(projectData.data.listMATCProjects.nextToken);
            }
          }
        } catch (err) {
          console.log("End of records: ", err);
        }
        //set projects for display
        setItems(holder1);
      }
      //request projects
      fetchProjects();
    }
    setLoading(false);
    setLoader(false);
  }, [nextToken, repository, filterState]);

  return { datas, isLoading };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     /*************This method uses standard SQL SELECT statements, it returns a dynamobd ojbect*/
  //     /*Dynamodb object must be unmarshalled into standard JSON format for this project to work*/
  //     if (repository === "GitHub" && word !== "") {
  //       async function fetchData() {
  //         const documentClient = new DynamoDB.DocumentClient();
  //         const params = {
  //           TableName: "GitHubProject",
  //           ScanIndexForward: true,
  //           FilterExpression:
  //             "contains(Description, :Description) AND forks_count >= :forks_count AND forks_count <= :maxForks AND open_issues_count >= :open_issues_count AND open_issues_count <= :maxIssues AND stargazers_count >= :stargazers_count AND stargazers_count <= :maxStarGazers AND watchers_count >= :watchers_count AND watchers_count <= :maxWatchers AND created_at >= :created_at AND updated_at <= :updated_at",

  //           ExpressionAttributeValues: {
  //             ":Description": `${word}`,
  //             ":forks_count": forks_count,
  //             ":open_issues_count": open_issues_count,
  //             ":stargazers_count": stargazers_count,
  //             ":watchers_count": watchers_count,
  //             ":created_at": `${start_date}`,
  //             ":updated_at": `${end_date}`,
  //             ":maxForks": max_forks_count,
  //             ":maxIssues": max_open_issues_count,
  //             ":maxStarGazers": max_stargazers_count,
  //             ":maxWatchers": max_watchers_count,
  //           },
  //         };

  //         const results = await documentClient
  //           .scan(params)
  //           .promise()
  //           .catch((err) => console.log(err));
  //         console.log(results);
  //         setItems(results.Items);
  //       }
  //       fetchData();
  //       setLoading(false);
  //     } else if (repository === "MATC" && word !== "") {
  //       async function fetchData() {
  //         const documentClient = new DynamoDB.DocumentClient();
  //         const params = {
  //           TableName: "MATCProject",
  //           //ProjectionExpression: "title, downloads, summary, author_uri, author_name, id, license, mathworks_url, no_of_comments, no_of_ratings, published, updated",
  //           FilterExpression:
  //             "contains(summary, :summary) AND published >= :published AND updated <= :updated AND downloads >= :downloads AND no_of_comments >= :no_of_comments AND no_of_comments <= :maxComments AND no_of_ratings >= :no_of_ratings AND no_of_ratings <= :maxRatings",
  //           ScanIndexForward: true,
  //           ExpressionAttributeValues: {
  //             ":summary": `${word}`,
  //             ":published": `${start_date}`,
  //             ":updated": `${end_date}`,
  //             ":no_of_ratings": number_of_ratings,
  //             ":downloads": `${forks_count}`,
  //             ":no_of_comments": number_of_comments,
  //             ":maxComments": max_number_of_comments,
  //             ":maxRatings": max_number_of_ratings
  //           },
  //         };

  //         const results = await documentClient
  //           .scan(params)
  //           .promise()
  //           .catch((err) => console.log(err));
  //         console.log(results);
  //         setItems(results.Items);
  //       }
  //       fetchData();
  //       setLoading(false);
  //     } else if (repository === "TYPE") {
  //       alert("Select repository type to begin search...");
  //     }
  //   }, [filterState]);
  //   return { isLoading, datas };
};

export default MATCFilterFetch;
