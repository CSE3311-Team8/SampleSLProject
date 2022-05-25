import React from "react";
import GitHubFilterFetch from "../useFetchHooks/GitHubFilterFetch";
import AdvancedMATCFilterFetch from "../useFetchHooks/AdvancedMATCFilterFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import BatchMATCFetch from "../useFetchHooks/BatchMATCFetch";
import Projects from "../components/Projects";

//Hosts the lists of projects matching search word
const AdvancedFilterList = (props) => {
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
  if (project === undefined) {
    project = [];
  }

  //the prop "word" comes from search bar and will be
  //the filtering parameter used for project filtering
  return (
    <div className="home">
      {/* {isLoading === true && (
          <div>
            <Spinner animation="border" variant="primary" /> Searching...
          </div>
        )} */}
      <Projects
        items={project}
        repository={repository}
        directWord={directWord}
      />
    </div>
  );
};

export default AdvancedFilterList;
