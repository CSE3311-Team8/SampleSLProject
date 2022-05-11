import React from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
//list of projects is generated using the prop received
const ProjectList = (props) => {
  const [visible, setVisible] = useState(10);
  const data = props.items;
  const database = props.repository;
  const directWord = props.directWord;
  const  word = props.word;
  var tag;
  var dummy =[]

  //console.log(database);
  let Visible = visible;

  const loadMOre = () => {
    setVisible(Visible + 10);
  };



  return (
    <div className="search-items">
      <div className="list">
        {/* {data.length === 0 && directWord !== "" &&(
          <div className="alert-spinner">No results to display...</div>
        )} */}
        {data.slice(0, visible).map((item) => {
          return (
            /* all columns set to 20% total width */
            <div className="preview" key={item.id}>
              <Table className="table">
                <thead>
                  <tr className="headers">
                    <th className="header">Owner</th>
                    <th className="header">Repository</th>
                    <th className="header">Owner Page</th>
                    <th className="header">Created On</th>
                    <th className="header">Updated On</th>
                    {/* <th className="header">Ratings</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="name">
                      {item.author_name || item.owner_name}
                    </td>
                    <td className="url">
                      <a href={item.mathworks_url || item.project_url}>
                        {item.title || item.repo_name}
                      </a>
                    </td>
                    <td className="url">
                      {(item.author_uri || item.homepage_url) !== null &&
                        (item.author_uri || item.homepage_url) !== "" && (
                          <a href={item.author_uri || item.homepage_url}>
                            take me there
                          </a>
                        )}
                    </td>
                    <td className="date-created">
                      {new Date(
                        item.published || item.created_at
                      ).toLocaleDateString()}
                    </td>
                    <td className="date-updated">
                      {new Date(
                        item.updated || item.updated_at
                      ).toLocaleDateString()}
                    </td>
                    {/* <td className="ratings">{item.no_of_ratings || item.no_of_ratings}</td> */}
                  </tr>
                  <tr>
                    <td className="description" align="center" colSpan={"12"}>
                      {database === "GitHub" && <p>{item.Description}</p>}
                      {database === "MATC" && <p>{item.summary}</p>}
                      {database === "All" && (
                        <p>{item.summary || item.Description}</p>
                      )}
                    </td>
                  </tr>
                  <tr className="attributes">
                    <td className="watchers">
                      {database === "GitHub" && <h1 className="headers">
                        watchers : {item.watchers_count}
                      </h1>}
                      {database === "MATC" && <h1 className="headers">
                        downloads : {item.downloads}
                      </h1>}
                      {database === "All" && <h1 className="headers">
                        {tag = (item.homepage_url === null || item.homepage_url === "") ? "watchers" : "downloads"} : {item.downloads || item.watchers_count}
                      </h1>}                      
              
                    </td>
                    <td className="language">
                      <h1 className="headers">
                        language : {item.language || "MATLAB"}
                      </h1>
                    </td>
                    <td className="forks">
                      {database === "GitHub" && <h1 className="headers">
                        forks : {item.forks_count}
                      </h1>}
                      {database === "MATC" && <h1 className="headers">
                        comments : {item.no_of_comments}
                      </h1>}
                      {database === "All" && <h1 className="headers">
                        {tag = (item.homepage_url === null || item.homepage_url === "") ? "forks" : "comments"} : {item.downloads || item.watchers_count}
                      </h1>} 
                      
                    </td>
                    <td className="license">
                      <h1 className="headers">license : {(item.license.length < 50 && item.license) || "BDS"}</h1>
                    </td>
                    <td>
                    {database === "GitHub" && <h1 className="headers">
                        stargazers : {item.stargazers_count || "0"}
                      </h1>}
                      {database === "MATC" && <h1 className="headers">
                        ratings : {item.no_of_ratings || "0"}
                      </h1>}
                      {database === "All" && <h1 className="headers">
                        {tag = (item.homepage_url === null || item.homepage_url === "") ? "stargazers" : "ratings"} : {item.stargazers_count || item.no_of_ratings}
                      </h1>} 
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
        <div className="page-count">
          {/* {visible < data.length && (
            <Button
              className="loader"
              variant="contained"
              size="medium"
              onClick={loadMOre}
            >
              Next 10
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
