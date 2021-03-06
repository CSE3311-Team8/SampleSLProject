import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";

//import pkg from "aws-sdk";

//const { config, DynamoDB } = pkg;
//const { unmarshall } = require("@aws-sdk/util-dynamodb");

const MATCFetch = (repository, word, setLoader) => {
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [nextTokenHolder, setNextTokenHolder] = useState("");
  const [stateTracker, setStateTracker] = useState("");
  const [filterTracker, setFilterTracker] = useState("");
  const [firstFetch, setFirstFetch] = useState(false);
  var [holder1, setHolder1] = useState([]); //collects projecst as they are found

  //query and fields requested
  const listMATCProjects = /* GraphQL */ `
  query listMATCProjects{
    listMATCProjects(limit: 250, filter: {summary: {contains: "${word}"}}) {
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
  listMATCProjects(limit: 250, filter: {summary: {contains: "${word}"}}, nextToken: "${nextToken}") {
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

  useEffect(() => {
    //this will set the next token to empty when word is reset
    //this ensures tables are scanned from beginning and not last token scanned

    if (word !== "" && (repository === "All" || repository === "MATC")) {
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
            if (holder1.length === 0 || holder1.length < 20) {
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
      setLoading(false);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    setLoader(false);
  }, [word, nextToken, repository]);

  return { datas, isLoading };
};

export default MATCFetch;
