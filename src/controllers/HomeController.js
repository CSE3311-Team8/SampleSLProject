import React, { useState } from "react";
import ProjectList from "../views/ProjectList";
import GitHubFetch from "./GitHubFetch"
import MATCFetch from "./MATCFetch"


import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Hosts the lists of projects matching search word
const Home = (props) => {
  const word = props.string;
  const database = props.string2;
  const setLoader = props.setLoader;
  const directWord= props.directWord;
  var allData = [];
  //will display a load effect between searches
  
 
    const {isLoading, data} = GitHubFetch(database, word, setLoader);
    const {datas} = MATCFetch(database, word, setLoader);
   

    if(database === "All")
    {
      allData = [...data,...datas];
    }
  


  //props.setLoader(false);
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  if(database === "GitHub")
  {
    return (
      <div className="home">
        {isLoading === true && (<div><Spinner animation="border" variant="primary" /> Searching...</div>)}
        <ProjectList items={data} repository={database} word = {word} directWord={directWord} />
      </div>
    );
  }
  else if(database === "MATC")
  {
    return (
      <div className="home">
        {isLoading === true && (<div><Spinner animation="border" variant="primary" /> Searching...</div>)}
        <ProjectList items={datas} repository={database} word = {word} directWord={directWord} />
      </div>
    );
  }
  else if(database === "All")
  {
    return (
      <div className="home">
        {isLoading === true && (<div><Spinner animation="border" variant="primary" /> Searching...</div>)}
        <ProjectList items={allData} repository={database} word = {word} directWord={directWord} />
      </div>
    );
  }

};

export default Home;
