import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
///import pkg from "aws-sdk";
//import { isCompositeComponent } from "react-dom/test-utils";

//const { config, DynamoDB } = pkg; //contains DocumentClient to unmarshall into correct JSON format

/****include this package when using standard SQL SELECT statement requests******/
//const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const GitHubFilterFetch = (
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
  max_number_of_ratings,
  setLoader,
  trigger,
  triggerState
) => {
  const [data, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [nextTokenHolder, setNextTokenHolder] = useState("");
  const [stateTracker, setStateTracker] = useState("");
  var [holder1, setHolder1] = useState([]); //collects projecst as they are found
  const [filterTracker, setFilterTracker] = useState("");
  const [firstFetch, setFirstFetch] = useState(false);

  const gitHubProjects = `
    query ListGitHubProjects{ 
    listGitHubProjects (limit: 100, filter: {Description: {contains: "${word}"}, language: {contains: "${language}"}, license: {contains: "${license}"}, created_at: {ge: "${start_date}", le: "${end_date}"}, forks_count: {ge: ${forks_count}, le: ${max_forks_count}}, open_issues_count: {ge: ${open_issues_count}, le: ${max_open_issues_count}}, stargazers_count: {ge: ${stargazers_count}, le: ${max_stargazers_count}}, watchers_count: {ge: ${watchers_count}, le: ${max_watchers_count}}}) {
      items {
        Description
        created_at
        forks_count
        homepage_url
        id
        language
        license
        model_files
        num_model_file
        open_issues_count
        owner_name
        project_url
        repo_name
        stargazers_count
        updated_at
        watchers_count
      }
      nextToken
    }
  }
  `;
  const gitHubProjectsToken = `
    query ListGitHubProjects{ 
    listGitHubProjects (limit: 100, filter: {Description: {contains: "${word}"}, language: {contains: "${language}"}, license: {contains: "${license}"}, created_at: {ge: "${start_date}", le: "${end_date}"}, forks_count: {ge: ${forks_count}, le: ${max_forks_count}}, open_issues_count: {ge: ${open_issues_count}, le: ${max_open_issues_count}}, stargazers_count: {ge: ${stargazers_count}, le: ${max_stargazers_count}}, watchers_count: {ge: ${watchers_count}, le: ${max_watchers_count}}}, nextToken: "${nextToken}")  {
      items {
        Description
        created_at
        forks_count
        homepage_url
        id
        language
        license
        model_files
        num_model_file
        open_issues_count
        owner_name
        project_url
        repo_name
        stargazers_count
        updated_at
        watchers_count
      }
      nextToken
    }
  }
  `;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //will execute function when data is updated
  //
  useEffect(() => {
    //this will set the next token to empty when word is reset
    //it ensures tables are scanned from beginning and not last token scanned
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

    if (repository === "All" || repository === "GitHub") {
      //this tracks the incoming word for comparison with next request
      //if the incoming query is different than this state,
      //next token will be set to "" and search will begin from start of table
      setLoading(true);
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
              graphqlOperation(gitHubProjects)
            );

            const projects = projectData.data.listGitHubProjects.items;
            //if there are no current projects to display or
            //if the list of projecst to display is less than 20
            //stack projects in holder until full and set the last place scanned
            if (holder1.length === 0 || holder1.length < 20) {
              setHolder1((holder1 = holder1.concat(projects))); //colledt projects
              setNextToken(projectData.data.listGitHubProjects.nextToken); //last place scanned
            } else {
              //if the project holder is full, set the last token/place scanned
              setNextTokenHolder(projectData.data.listGitHubProjects.nextToken);
              //setLoader(true);
            }
          } else if (firstFetch === true) {
            //this condition tracks which fetch to use, token or no token
            //this will execute a scan without a next token
            //this means word search bar was changed
            const projectData = await API.graphql(
              graphqlOperation(gitHubProjectsToken)
            );
            const projects = projectData.data.listGitHubProjects.items;
            //if there are no current projects to display or
            //if the list of projecst to display is less than 20
            //stack projects in holder until full and set the last place scanned
            if (holder1.length === 0 || holder1.length < 11) {
              setHolder1((holder1 = holder1.concat(projects))); //colledt projects
              setNextToken(projectData.data.listGitHubProjects.nextToken); //last place scanned
              //setLoader(true);
            } else {
              //if the project holder is full, set the last token/place scanned
              setNextTokenHolder(projectData.data.listGitHubProjects.nextToken);
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

  return { data, isLoading };

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

export default GitHubFilterFetch;
