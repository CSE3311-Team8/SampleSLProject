import React from "react";
import { useAbsoluteLayout } from "react-table";
import ProjectList from "../views/ProjectList";
import Filter from "../views/Filter";
//import useFilterFetch from "./useFilterFetch";

import useFilterFetch from "./useFilterFetch";

//Hosts the lists of projects matching search word
const FilterController = (props) => {
  const repository = props.repository;
  const word = props.word;
  const start_date = props.start_data;

  
  const end_date = props.end_date;
  const language = props.language;
  const license = props.license;
  const forks_count = props.forks_count;
  const open_issues_count = props.open_issues_count;
  const stargazers_count = props.stargazers_count;
  const number_of_comments = props.number_of_comments;
  const watchers_count = props.watchers_count;
  const number_of_ratings = props.number_of_comments;

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
    number_of_comments,
    number_of_ratings
  );

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
