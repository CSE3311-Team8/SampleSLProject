import React from "react";
import GitHubFilterFetch from "../useFetchHooks/GitHubFilterFetch";
import MATCFilterFetch from "../useFetchHooks/MATCFilterFetch";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Projects from "../components/projects/Projects";
//Hosts the lists of projects matching search word
const FilterList = (props) => {
  const repository = props.repository;
  const word = props.word;
  const start_date = props.start_date;
  //console.log(start_date);
  const end_date = props.end_date;
  //console.log(end_date);
  const language = props.language;
  const license = props.license;
  const forks_count = props.forks_count;
  const open_issues_count = props.open_issues_count;
  const stargazers_count = props.stargazers_count;
  const number_of_comments = props.number_of_comments;
  const watchers_count = props.watchers_count;
  const number_of_ratings = props.number_of_ratings;
  const filterState = props.filterState;
  const max_forks_count = props.max_forks_count;
  const max_open_issues_count = props.max_open_issues_count;
  const max_stargazers_count = props.max_stargazers_count;
  const max_number_of_comments = props.max_number_of_comments;
  const max_number_of_ratings = props.max_number_of_ratings;
  const max_watchers_count = props.max_watchers_count;
  const setLoader = props.setLoader;
  const trigger = props.triggerFilter;
  const triggerState = props.triggerState;
  var allData = [];
  const directWord = props.directWord;
  const downloads = props.downloads;
  const maxDownloads = props.maxDownloads;

  const { isLoading, data } = GitHubFilterFetch(
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
  );

  const { datas } = MATCFilterFetch(
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
  );

  //console.log("filter state in controller", filterState)
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  if (repository === "All") {
    allData = [...data, ...datas];
  }

  //props.setLoader(false);
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  if (repository === "GitHub") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects
          items={data}
          repository={repository}
          directWord={directWord}
        />
      </div>
    );
  } else if (repository === "MATC") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects
          items={datas}
          repository={repository}
          word={word}
          directWord={directWord}
        />
      </div>
    );
  } else if (repository === "All") {
    return (
      <div className="home">
        {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )}
        <Projects
          items={allData}
          repository={repository}
          word={word}
          directWord={directWord}
        />
      </div>
    );
  }
};

export default FilterList;
