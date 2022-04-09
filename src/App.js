import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import AdvancedFilter from "./views/AdvancedFilter"
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DateObject from "react-date-object";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Home from "./controllers/HomeController";
import Filter from "./views/Filter";
import FilterController from "./controllers/FilterController";

import "react-datepicker/dist/react-datepicker.css"

//test comment

function App() {
  //hook for search word

  const [searchWord, setSearchWord] = useState("");
  const [filterSearchWord, setFilterSearchWord] = useState("");
  const [tempSearchWord, setTempSearchWord] = useState("");
  const [repository, setRepository] = useState("TYPE");
  const [repo, setRepo] = useState("");
  const [filterRepo, setFilterRepo] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
  const [filterWatch, setFilterWatch] = useState(false);
  const [filterTracker, setFilterTracker] = useState(false);
  const [advancedFilterTracker, setAdvancedFilterTracker] = useState(false);
  const [forksCount, setForksCount] = useState(0);
  const [openIssuesCount, setOpenIssuesCount] = useState(0);
  const [starGazersCount, setStarGazersCount] = useState(0);
  const [startDate, setStartDate] = useState(new DateObject(""));
  const [startDates, setStartDates] = useState(new DateObject(""));
  const [endDate, setEndDate] = useState(new DateObject(""));
  const [endDates, setEndDates] = useState(new DateObject(""));
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
  const [languageTitle, setLanguageTitle] = useState("");
  const [licenseTitle, setLicenseTitle] = useState("");
  const [advancedFilterWatch, setAdvancedFilterwatch] = useState(false)

  //search bar title
  const header = "Simulink Search";
  const handleSelect = (event) => {
    setRepository(event);
  };

  const filterSetter = () => {
    setOpenFilter(false);
    //console.log(openFilter);
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

  //this function handles the input form

  const handleChange = () => {
    var id = document.getElementsByTagName("input")[0];
    setTempSearchWord(id.value);
  };

  const handleClick = () => {
    setOpenFilter(false); //closes filter modal
    setOpenAdvancedFilter(false);
    setSearchWord(tempSearchWord);
    setRepo(repository);
  };

  const handleFilter = () => {
    //will clear search bar when filter button is clicked
    //this triggers the intial fetch, find wher it
    setOpenFilter(true);
    setOpenAdvancedFilter(false); //opens filter modal
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    if (filterTracker === true) {
      setFilterTracker(false);
    } else if (filterTracker === false) {
      setFilterTracker(true);
    }
    setFilterWatch(true);

  };
  const handleAdvancedFilter = () => {
    //will clear search bar when filter button is clicked
    //this triggers the intial fetch, find wher it
    setOpenFilter(false);
    setOpenAdvancedFilter(true); //opens filter modal
    //setFilterSearchWord(tempSearchWord);
    //setFilterRepo(repository);
    if (advancedFilterTracker === true) {
      setAdvancedFilterTracker(false);
    } else if (advancedFilterTracker === false) {
      setAdvancedFilterTracker(true);
    }
    setAdvancedFilterwatch(true);

  };

  ///onClick for for x button, set everything to null

  //search bar implemented in App.js so it persists on page, could be done with component
  //home route returns regular search bar
  //filter switches to the filtering page
  /*Table headers must be set to 20%*/
  /*Give bottom margin to tables mapped in regular search*/

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
          {openFilter === false && (
            <Home string={searchWord} string2={repo} string3={repository} />
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
              />
              <FilterController
                repository={filterRepo}
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
                max_forks_count = {maxforksCount}
                max_open_issues_count = {maxopenIssuesCount}
                max_stargazers_count ={maxstarGazersCount}
                max_watchers_count = {maxwatchersCount}
                max_number_of_comments = {maxnumberOfComments}
                max_number_of_ratings = {maxnumberOfRatings}
              />
            </>
          )}
          {openFilter === false && openAdvancedFilter === true &&(
              <AdvancedFilter  closeAdvancedFilter = {advancedFilterSetter} advancedFilterState = {advancedFilterWatch}/>
          
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default App;
