import { ComponentPropsToStylePropsMap } from "@aws-amplify/ui-react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
///import pkg from "aws-sdk";
//import { isCompositeComponent } from "react-dom/test-utils";

//const { config, DynamoDB } = pkg; //contains DocumentClient to unmarshall into correct JSON format

/****include this package when using standard SQL SELECT statement requests******/
//const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const BatchMATCFetch = (ids, advancedFilterState) => {
  const pageLimit = 40;
  const pageLimitAll = 40;
  const [page, setPage] = useState(1);
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [nextTokenHolder, setNextTokenHolder] = useState("");
  const [stateTracker, setStateTracker] = useState("");
  var [project, setProject] = useState([]);
  var [projectId, setProjectId] = useState(0); //collects projecst as they are found
  const [filterTracker, setFilterTracker] = useState("");
  const [firstFetch, setFirstFetch] = useState(false);
  const IDs = [];
  var [holder, setHolder] = useState([]);

  ids.forEach((id) => {
    IDs.push(id.FILE_ID);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //will execute function when data is updated

  useEffect(() => {
    //this will set the next token to empty when word is reset
    //this ensures tables are scanned from beginning and not last token scanned

    //third condition tracks the filter button to clear tokens when when looking for
    //same word with different parameters, e.g. more comments, more stargazers
 
    setLoading(true);
    //this tracks the incoming word for comparison with next request
    //if the incoming query is different than this state,
    //next token will be set to "" and search will begin from start of table

    async function fetchProjects() {
      try {
        for (const id of IDs) {
          const getMATCProject = /* GraphQL */ `
            query GetMATCProject{
              getMATCProject(id: ${id}) {
                id
                author_name
                author_uri
                average_rating
                category
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
            }
          `;

          const projectData = await API.graphql(
            graphqlOperation(getMATCProject)
          );
            //console.log(projectData.data.getMATCProject)
          setHolder((holder = holder.concat(projectData.data.getMATCProject)));
        }

        //if there are no current projects to display or
        //if the list of projecst to display is less than 20
        //stack projects in holder until full and set the last place scanned
      } catch (err) {
        console.log("End of records: ", err);
      }
      //set projects for display
      
      if (holder.length !== 0) {
        console.log(ids)
        console.log(holder);
      }
    }
    //request projects
    fetchProjects();
    //setItems(holder);
    //setLoading(false);
  }, [nextToken, advancedFilterState]);

  return { datas, isLoading };
};

export default BatchMATCFetch;
