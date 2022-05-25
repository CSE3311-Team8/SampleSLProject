import React from "react";
import GitHubFetch from "../useFetchHooks/GitHubFetch";
import MATCFetch from "../useFetchHooks/MATCFetch";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Projects from "../components/Projects";

//Hosts the lists of projects matching search word
const SearchList = (props) => {
  const word = props.string;
  const database = props.string2;
  const setLoader = props.setLoader;
  const directWord = props.directWord;
  var allData = [];

  const { isLoading, data } = GitHubFetch(database, word, setLoader);
  const { datas } = MATCFetch(database, word, setLoader);

  if (database === "All") {
    allData = [...data, ...datas];
  }

  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  if (database === "GitHub") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects items={data} repository={database} directWord={directWord} />
      </div>
    );
  } else if (database === "MATC") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects items={datas} repository={database} directWord={directWord} />
      </div>
    );
  } else if (database === "All") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects
          items={allData}
          repository={database}
          directWord={directWord}
        />
      </div>
    );
  }
};

export default SearchList;
