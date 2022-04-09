import React from "react";
import ProjectList from "../views/ProjectList";

//import useFilterFetch from "./useFilterFetch";

import useFilterFetch from "./useFilterFetch";

//Hosts the lists of projects matching search word
const FilterController = (props) => {
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
  //console.log(filterState);
  //console.log(repository);
  //console.log(forks_count);

  /*
  max_forks_count={forks_count_setter}
  max_open_issues_count={open_issues_count_setter}
  max_stargazers_count={stargazers_count_setter}
  max_watchers_count={watchers_count_setter}
  max_number_of_comments={number_of_comments_setter}
  max_number_of_ratings={number_of_ratings_setter}
  */
  
  const { isLoading, datas } = useFilterFetch(
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
    max_number_of_ratings

  );

    //console.log("filter state in controller", filterState)
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  return (
    <div className="home">
      {isLoading && <div>Loading...</div>}

      <ProjectList items={datas} repository={props.repo} word={props.word} />
    </div>
  );
};

export default FilterController;
