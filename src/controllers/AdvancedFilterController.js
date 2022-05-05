import React from "react";
import ProjectList from "../views/ProjectList";
import GitHubFilterFetch from "./GitHubFilterFetch";
import AdvancedMATCFilterFetch from "./AdvancedMATCFilterFetch";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BatchMATCFetch from "./BatchFetchMATC";

//Hosts the lists of projects matching search word
const AdvancedFilterController = (props) => {
  const repository = props.repository;
  const word = props.word;
  const blockCount = props.blockCount;
  const maxBlockCount = props.maxBlockCount;
  const algebraicCount = props.algebraicCount;
  const maxAlgebraicCount = props.maxAlgebraicCount;
  const subsysCount = props.subsysCount;
  const maxSubsysCount = props.maxSubsysCount;
  const uniqueSFunctionCount = props.uniqueSFunctionCount;
  const maxUniqueSFunctionCount = props.maxUniqueSFunctionCount;
  const hierarchyDepth = props.hierarchyDepth;
  const maxHierarchyDepth = props.maxHierarchyDepth;
  const uniqueModelReference = props.uniqueModelReference;
  const maxUniqueModelReference = props.maxUniqueModelReference;
  const libraryLinkedCount = props.libraryLinkedCount;
  const maxLibraryLinkedCount = props.maxLibraryLinkedCount;
  const cyclomaticComplexity = props.cyclomaticComplexity;
  const maxCyclomaticComplexity = props.maxCyclomaticComplexity;
  const includeExclude = props.includeExclude;
  const targetHardware = props.targetHardware;
  const solverType = props.solverType;
  const simulationMode = props.simulationMode;
  const directWord = props.directWord;
  const advancedFilterState = props.advancedFilterState;
  const setLoader = props.setLoader;
  const trigger = props.triggerFilter;
  const triggerState = props.triggerState;
  var holder1 = [];

  /*******************************pass trigger filters from app.js***************************************/
  // const { isLoading, data } = GitHubFilterFetch(
  //   word,
  //   blockCount,
  //   maxBlockCount,
  //   algebraicCount,
  //   maxAlgebraicCount,
  //   subsysCount,
  //   maxSubsysCount,
  //   uniqueSFunctionCount,
  //   maxUniqueSFunctionCount,
  //   hierarchyDepth,
  //   maxHierarchyDepth,
  //   uniqueModelReference,
  //   advancedFilterState,
  //   maxUniqueModelReference,
  //   libraryLinkedCount,
  //   maxLibraryLinkedCount,
  //   cyclomaticComplexit,
  //   maxCyclomaticComplexity,
  //   includeExclude,
  //   targetHardware,
  //   solverType,
  //   simulationMode,
  //   directWord,
  //   setLoader,
  //   trigger,
  //   triggerState
  // );

  const { ids } = AdvancedMATCFilterFetch(
    repository,
    word,
    blockCount,
    maxBlockCount,
    algebraicCount,
    maxAlgebraicCount,
    subsysCount,
    maxSubsysCount,
    uniqueSFunctionCount,
    maxUniqueSFunctionCount,
    hierarchyDepth,
    maxHierarchyDepth,
    uniqueModelReference,
    advancedFilterState,
    maxUniqueModelReference,
    libraryLinkedCount,
    maxLibraryLinkedCount,
    cyclomaticComplexity,
    maxCyclomaticComplexity,
    includeExclude,
    targetHardware,
    solverType,
    simulationMode,
    directWord,
    setLoader,
    trigger,
    triggerState
  );

  var { project } = BatchMATCFetch(ids, advancedFilterState);

 
  
  //console.log("filter state in controller", filterState)
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  // if (repository === "All") {
  //   allData = [...data, ...datas];
  // }
  if(project === undefined){
    project = []
  }
  //props.setLoader(false);
  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering

  return (
    <div className="home">
      {/* {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )} */}
      <ProjectList
        items={project}
        repository={repository}
        word={word}
        directWord={directWord}
      />
    </div>
  );
};

export default AdvancedFilterController;
