/* src/App.js */
import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import AdvancedFilter from "./views/AdvancedFilter";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DateObject from "react-date-object";
import { Button } from "@mui/material";
import Home from "./controllers/HomeController";
import Filter from "./views/Filter";
import FilterController from "./controllers/FilterController";
import "react-datepicker/dist/react-datepicker.css";
import awsExports from "./aws-exports";
import AdvancedFilterController from "./controllers/AdvancedFilterController";

Amplify.configure(awsExports);

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [filterSearchWord, setFilterSearchWord] = useState("");
  const [tempSearchWord, setTempSearchWord] = useState("");
  const [repository, setRepository] = useState("All");
  const [repo, setRepo] = useState("");

  //search bar title
  const header = "Simulink Search";
  const handleSelect = (event) => {
    setRepository(event);
    setSearchWord(tempSearchWord);
  };

  /*****************************Filter Values******************************/
  const [filterRepo, setFilterRepo] = useState("");
  const [forksCount, setForksCount] = useState(0);
  const [openIssuesCount, setOpenIssuesCount] = useState(0);
  const [starGazersCount, setStarGazersCount] = useState(0);
  const [startDate, setStartDate] = useState(new DateObject(""));
  const [endDate, setEndDate] = useState(new DateObject(""));
  const [watchersCount, setWatchersCount] = useState(0);
  const [language, setLanguage] = useState("");
  const [license, setLicense] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [maxforksCount, setMaxForksCount] = useState(0);
  const [maxopenIssuesCount, setMaxOpenIssuesCount] = useState(0);
  const [maxstarGazersCount, setMaxStarGazersCount] = useState(0);
  const [maxwatchersCount, setMaxWatchersCount] = useState(0);
  const [maxnumberOfComments, setMaxNumberOfComments] = useState(0);
  const [maxnumberOfRatings, setMaxNumberOfRatings] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [maxDownloads, setMaxDownloads] = useState(0);
  const [languageTitle, setLanguageTitle] = useState("");
  const [licenseTitle, setLicenseTitle] = useState("");
  const [tokenTracker, setTokenTracker] = useState("");
  const [openSpinner, setOpenSpinner] = useState(false);
  /*********^^^^^^^^^^^^^^^^^^^^^Filter Values^^^^^^^^^^^^^^^^^^^^^^^^************/

  /*****************************Advanced Filter Values******************************/
  const [blockCount, setBlockCount] = useState(0);
  const [maxBlockCount, setMaxBlockCount] = useState(0);
  const [algebraicCount, setAlgebraicCount] = useState(0);
  const [maxAlgebraicCount, setMaxAlgebraicCount] = useState(0);
  const [subsysCount, setsubsysCount] = useState(0);
  const [maxSubsysCount, setMaxSubsysCount] = useState(0);
  const [uniqueSFunctionCount, setUniqueSFunctionCount] = useState(0);
  const [maxUniqueSFunctionCount, setMaxUniqueSFunctionCount] = useState(0);
  const [hierarchyDepth, setHierarchyDepth] = useState(0);
  const [maxHierarchyDepth, setMaxHierarchyDepth] = useState(0);
  const [uniqueModelReference, setUniqueModelReference] = useState(0);
  const [maxUniqueModelReference, setMaxUniqueModelReference] = useState(0);
  const [libraryLinkedCount, setLinkedLibrayCount] = useState(0);
  const [maxLibraryLinkedCount, setMaxLinkedLibraryCount] = useState(0);
  const [cyclomaticComplexity, setCyclomaticComplexity] = useState(0);
  const [maxCyclomaticComplexity, setMaxCyclomaticComplexity] = useState(0);
  const [includeExclude, setIncludeExclude] = useState(-1);
  const [targetHardware, setTargetHardware] = useState(" ");
  const [solverType, setSolverType] = useState(" ");
  const [simulationMode, setSimulationMode] = useState(" ");

  
 
  /*^^^^^^^^^^^^^^^^^^^^^^^^^^Advanced Filter Values^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  /******************************Triggers********************************************/
  const [openFilter, setOpenFilter] = useState(false);
  const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
  const [filterWatch, setFilterWatch] = useState(false);
  const [advancedFilterWatch, setAdvancedFilterWatch] = useState(false)
  const [filterWatchTrigger, setFilterWatchTrigger] = useState(false);
  const [advancedFilterWatchTrigger, setAdvancedFilterWatchTrigger] = useState(false);
  const [filterTracker, setFilterTracker] = useState(false);
  const [advancedFilterTracker, setAdvancedFilterTracker] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Trigers^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  /*****************************Search bar handlers**********************************/
  //this function handles the text from search bar
  const handleChange = () => {
    setOpenLoader(false);
    var id = document.getElementsByTagName("input")[0];
    setTempSearchWord(id.value);
    setFilterWatch(true);
  };

  //handles search button click
  const handleClick = () => {
    setOpenLoader(true);
    //closes filter modal when swiching from filter to regular search
    setOpenFilter(false);
    //closes advanced filter when switching to regular search
    setOpenAdvancedFilter(false);
    setSearchWord(tempSearchWord); //query string
    setRepo(repository); //repo to query
  };

  const handleLoader = (event) => {
    setFilterSearchWord(tempSearchWord);
    setOpenLoader(event);
  };
  /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Search bar handlers^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  /*************************************Filter Handlers**************************************/
  const filterSetter = () => {
    setOpenFilter(false);
  };
  const advancedFilterSetter = () => {
    setOpenAdvancedFilter(false);
    //console.log(openFilter);
  };
  const start_date_setter = (event) => {
    const date = new DateObject(event);
    const middleMan = date.format("YYYY-MM-DD hh:mm:ss.SSSSSS");
    //console.log(middleMan);
    setStartDate(middleMan);
  };
  const end_date_setter = (event) => {
    const date = new DateObject(event);
    const middleMan = date.format("YYYY-MM-DD hh:mm:ss.SSSSSS");
    //console.log(middleMan);
    setEndDate(middleMan);
  };
  const language_setter = (event) => {
    setLanguage(event);
    //console.log(language);
  };
  function forks_count_setter(value) {
    //console.log(forksCount);
    setForksCount(value);
  }
  const open_issues_count_setter = (value) => {
    //console.log(openIssuesCount);
    setOpenIssuesCount(value);
  };

  const license_setter = (event) => {
    //console.log(license);
    setLicense(event);
  };
  const stargazers_count_setter = (event) => {
    setStarGazersCount(event);
  };
  const number_of_comments_setter = (event) => {
    setNumberOfComments(event);
  };
  const number_of_ratings_setter = (event) => {
    setNumberOfRatings(event);
    //console.log(numberOfRatings);
  };
  const watchers_count_setter = (event) => {
    setWatchersCount(event);
  };
  function max_forks_count_setter(value) {
    //console.log(maxforksCount);
    setMaxForksCount(value);
  }
  const max_open_issues_count_setter = (value) => {
    //console.log(maxopenIssuesCount);
    setMaxOpenIssuesCount(value);
  };
  const max_stargazers_count_setter = (event) => {
    setMaxStarGazersCount(event);
  };
  const max_number_of_comments_setter = (event) => {
    setMaxNumberOfComments(event);
  };
  const max_watchers_count_setter = (event) => {
    setMaxWatchersCount(event);
  };
  const max_number_of_ratings_setter = (event) => {
    setMaxNumberOfRatings(event);
  };
  const language_title_setter = (event) => {
    setLanguageTitle(event);
  };
  const license_title_setter = (event) => {
    setLicenseTitle(event);
  };

  const max_downloads_setter = (event) => {
    setMaxDownloads(event);
    console.log(maxDownloads);
  };
  const downloads_setter = (event) => {
    setDownloads(event);
  };

  const handleFilter = () => {
    setOpenLoader(true);
    setFilterWatchTrigger(true);
    setOpenAdvancedFilter(false); //opens filter modal
    setOpenFilter(true);
    setOpenSpinner(true);
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    if (filterTracker === true) {
      setFilterTracker(false);
    } else if (filterTracker === false) {
      setFilterTracker(true);
    }
    setFilterWatch(true);
  };

  const filter_tracker_setter = (e) => {
    setOpenLoader(true);
    setFilterWatchTrigger(true);
    setOpenAdvancedFilter(false); //opens filter modal
    setOpenFilter(true);
    setOpenSpinner(true);
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    if (filterTracker === true) {
      setFilterTracker(false);
    } else if (filterTracker === false) {
      setFilterTracker(true);
    }
    setFilterWatch(true);
  };

  const filter_search_setter = (e) => {
    setFilterWatchTrigger(false);
  };

  /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Filter handlers ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  /********************************Advanced Filter Handlers*************************************/
  const handleAdvancedFilter = (e) => {
    //will clear search bar when filter button is clicked
    //this triggers the intial fetch, find wher it
    setAdvancedFilterWatchTrigger(true);
    setOpenFilter(false);
    setOpenAdvancedFilter(true); //opens filter modal
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    if (advancedFilterTracker === true) 
    {
       setAdvancedFilterTracker(false);
    } else if (advancedFilterTracker === false) 
    {
       setAdvancedFilterTracker(true);
    }
    setAdvancedFilterWatch(true);
  };

  
  const advanced_filter_tracker_setter = (e) => {
    setOpenLoader(true);
    setAdvancedFilterWatchTrigger(true);
    setOpenAdvancedFilter(true); //opens filter modal
    setOpenFilter(false);
    setOpenSpinner(true);
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    if (advancedFilterTracker === true) {
      setAdvancedFilterTracker(false);
    } else if (advancedFilterTracker === false) {
      setAdvancedFilterTracker(true);
    }
    setAdvancedFilterWatch(true);
  
  };

  const advanced_filter_search_setter = (e) => {
    setAdvancedFilterWatchTrigger(false);
  };

  function BlockCountSetter(event) {
   

    setBlockCount(event);
  }
  function MaxBlockCountSetter(event) {
    setMaxBlockCount(event);
  }
  function AlgebraicCountSetter(event) {
    setAlgebraicCount(event);
  }
  function MaxAlgebraicCountSetter(event) {
    setMaxAlgebraicCount(event);
  }

  function SubsysCountSetter(event) {
    setsubsysCount(event);
  }
  function MaxSubsysCountSetter(event) {
    setMaxSubsysCount(event);
  }
  function SFunctionCountSetter(event) {
    

    setUniqueSFunctionCount(event);
  }
  function MaxSFunctionCountSetter(event) {
    setMaxUniqueSFunctionCount(event);
  }
  function HierarchyDepthSetter(event) {
    setHierarchyDepth(event);
  }
  function MaxHierarchyDepthSetter(event) {
    setMaxHierarchyDepth(event);
  }

  function UniqueModelReferenceSetter(event) {
    setUniqueModelReference(event);
  }
  function MaxUniqueModelReferenceSetter(event) {
    setMaxUniqueModelReference(event);
  }

  function LinkedCountSetter(event) {
    setLinkedLibrayCount(event);
  }

  function MaxLinkedCountSetter(event) {
    setMaxLinkedLibraryCount(event);
  }

  function CyclomaticComplexitySetter(event) {
    setCyclomaticComplexity(event);
  }

  function MaxCyclomaticComplexitySetter(event) {
    setMaxCyclomaticComplexity(event);
  }

  const IncludeExcludeSetter = (event) => {
    setIncludeExclude(event);
  };

  const TargetHardwareSetter = (event) => {
    setTargetHardware(event);
  };

  const SolverTypeSetter = (event) => {
    setSolverType(event);
  };

  const SimulationModeSetter = (event) => {
    setSimulationMode(event);
  };




  /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Advanced Filter Handlers^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  //search bar implemented in App.js so it persists on page, could be done with component
  return (
    <Container className="App">
      <h2>{header}</h2>
      <Row className="search">
        <Col md={1}>
          <DropdownButton
            id="dropdown-item-button"
            style={{ marginBottom: "5%" }}
            title={repository}
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="GitHub" as="button">
              GitHub
            </Dropdown.Item>
            <Dropdown.Item eventKey="MATC" as="button">
              MATC
            </Dropdown.Item>
            <Dropdown.Item eventKey="All" as="button">
              All
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={8} className="repositories">
          <Form>
            <FormGroup>
              <InputGroup>
                <FormControl
                  placeholder="Search here..."
                  onChange={handleChange}
                  md={8}
                />
                <Button
                  md={1}
                  className="search-button"
                  variant="contained"
                  size="medium"
                  onClick={handleClick}
                >
                  Search
                </Button>
                <Button
                  md={1}
                  className="filter-button"
                  variant="contained"
                  size="medium"
                  onClick={handleFilter}
                >
                  Filter
                </Button>
                <Button
                  md={1}
                  className="advanced-filter-button"
                  variant="contained"
                  size="medium"
                  onClick={handleAdvancedFilter}
                >
                  Advanced Filter
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row className="items">
        <Col className="item-list" md="12">
          {openLoader === true &&
            openFilter === false &&
            openAdvancedFilter === false && (
              <>
                <div className="alert-spinner">
                  <Spinner animation="grow" variant="primary" /> Update Search
                  Query
                </div>
                <br />
              </>
            )}
          {/*condition here to stop re-fetch when filter close happens*/}
          {openFilter === false && openAdvancedFilter === false && (
            <Home
              string={searchWord}
              string2={repository}
              setLoader={handleLoader}
              directWord={tempSearchWord}
            />
          )}

          {openFilter === true && openAdvancedFilter === false && (
            <>
              <Filter
                filterState={filterWatch}
                closeFilter={filterSetter}
                forks_count={forks_count_setter}
                open_issues_count={open_issues_count_setter}
                stargazers_count={stargazers_count_setter}
                start_date={start_date_setter}
                watchers_count={watchers_count_setter}
                end_date={end_date_setter}
                language={language_setter}
                license={license_setter}
                downloads={downloads_setter}
                maxDownloads={max_downloads_setter}
                number_of_comments={number_of_comments_setter}
                number_of_ratings={number_of_ratings_setter}
                language_title={language_title_setter}
                license_title={license_title_setter}
                max_forks_count={max_forks_count_setter}
                max_open_issues_count={max_open_issues_count_setter}
                max_stargazers_count={max_stargazers_count_setter}
                max_watchers_count={max_watchers_count_setter}
                max_number_of_comments={max_number_of_comments_setter}
                max_number_of_ratings={max_number_of_ratings_setter}
                repository={repository}
                filteredSearchTrigger={filter_tracker_setter}
              />
              <FilterController
                repository={repository}
                word={filterSearchWord}
                start_date={startDate}
                end_date={endDate}
                language={language}
                license={license}
                forks_count={forksCount}
                open_issues_count={openIssuesCount}
                stargazers_count={starGazersCount}
                number_of_comments={numberOfComments}
                watchers_count={watchersCount}
                number_of_ratings={numberOfRatings}
                filterState={filterTracker}
                downloads={downloads}
                maxDownloads={maxDownloads}
                max_forks_count={maxforksCount}
                max_open_issues_count={maxopenIssuesCount}
                max_stargazers_count={maxstarGazersCount}
                max_watchers_count={maxwatchersCount}
                max_number_of_comments={maxnumberOfComments}
                max_number_of_ratings={maxnumberOfRatings}
                setLoader={handleLoader}
                triggerFilter={filter_search_setter}
                triggerState={filterWatchTrigger}
                directWord={tempSearchWord}
              />
            </>
          )}
          {openFilter === false && openAdvancedFilter === true && (
            <>
              <AdvancedFilter
                closeAdvancedFilter={advancedFilterSetter}
                advancedFilterState={openAdvancedFilter}
                blockCount={BlockCountSetter}
                maxBlockCount={MaxBlockCountSetter}
                algebraicCount={AlgebraicCountSetter}
                maxAlgebraicCount={MaxAlgebraicCountSetter}
                subsysCount={SubsysCountSetter}
                maxSubsysCount={MaxSubsysCountSetter}
                uniqueSFunctionCount={SFunctionCountSetter}
                maxUniqueSFunctionCount={MaxSFunctionCountSetter}
                hierarchyDepth={HierarchyDepthSetter}
                maxHierarchyDepth={MaxHierarchyDepthSetter}
                uniqueModelReference={UniqueModelReferenceSetter}
                maxUniqueModelReference={MaxUniqueModelReferenceSetter}
                libraryLinkedCount={LinkedCountSetter}
                maxLibraryLinkedCount={MaxLinkedCountSetter}
                cyclomaticComplexity={CyclomaticComplexitySetter}
                maxCyclomaticComplexity={MaxCyclomaticComplexitySetter}
                includeExclude={IncludeExcludeSetter}
                targetHardware={TargetHardwareSetter}
                solverType={SolverTypeSetter}
                simulationMode={SimulationModeSetter}
                advancedFilteredSearchTrigger={advanced_filter_tracker_setter}
              />

              <AdvancedFilterController
                repository={repository}
                word={filterSearchWord}
                blockCount={blockCount}
                maxBlockCount={maxBlockCount}
                algebraicCount={algebraicCount}
                maxAlgebraicCount={maxAlgebraicCount}
                subsysCount={subsysCount}
                maxSubsysCount={maxSubsysCount}
                uniqueSFunctionCount={uniqueSFunctionCount}
                maxUniqueSFunctionCount={maxUniqueSFunctionCount}
                hierarchyDepth={hierarchyDepth}
                maxHierarchyDepth={maxHierarchyDepth}
                uniqueModelReference={uniqueModelReference}
                maxUniqueModelReference={maxUniqueModelReference}
                libraryLinkedCount={libraryLinkedCount}
                maxLibraryLinkedCount={maxLibraryLinkedCount}
                cyclomaticComplexity={cyclomaticComplexity}
                setLoader={handleLoader}
                triggerFilter={advanced_filter_search_setter}
                triggerState={advancedFilterWatchTrigger}
                maxCyclomaticComplexity={maxCyclomaticComplexity}
                includeExclude={includeExclude}
                targetHardware={targetHardware}
                solverType={solverType}
                simulationMode={simulationMode}
                directWord={tempSearchWord}
                advancedFilterState = {advancedFilterTracker}


                
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default App;
