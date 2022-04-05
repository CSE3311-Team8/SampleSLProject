import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Home from "./controllers/HomeController";
import Filter from "./views/Filter";
import FilterController from "./controllers/FilterController";

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
  const [filterWatch, setFilterWatch] = useState(false);
  const [forksCount, setForksCount] = useState(0);
  const [openIssuesCount, setOpenIssuesCount] = useState(0);
  const [starGazersCount, setStarGazersCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [watchersCount, setWatchersCount] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [language, setLanguage] = useState("");
  const [license, setLicense] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [languageTitle, setLanguageTitle] = useState("Select Language");
  const [licenseTitle, setLicenseTitle] = useState("Select License");

  //search bar title
  const header = "Simulink Search";
  const handleSelect = (event) => {
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";

    setRepository(event);
  };

  //
  const setter = () => {
    setOpenFilter(false);
    console.log(openFilter);
  };
  function forks_count_setter(value) {
    console.log(forksCount);
    setForksCount(value);
  }
  const open_issues_count_setter = (event) => {
    console.log(openIssuesCount);
    setOpenIssuesCount(event);
  };
  const stargazers_count_setter = (event) => {
    setStarGazersCount(event);
  };
  const watchers_count_setter = (event) => {
    setWatchersCount(event);
  };
  const end_date_setter = (event) => {
    setEndDate(event);
  };
  const language_setter = (event) => {
    console.log(language);
    setLanguage(event);
  };
  const license_setter = (event) => {
    console.log(license);
    setLicense(event);
  };
  const number_of_comments_setter = (event) => {
    setNumberOfComments(event);
  };
  const number_of_ratintgs_setter = (event) => {
    setNumberOfRatings(event);
  };
  const language_title_setter = (event) => {
    setLanguageTitle(event);
  };
  const license_title_setter = (event) => {
    setLicenseTitle(event);
  };
  const start_date_setter = (event) => {
    setStartDate(event);
  };

  const searchBarSetter = () => {
    setSearchWord(searchWord);
    //setOpenFilter(false);
  };

  //this function handles the input form

  const handleChange = () => {
    var id = document.getElementsByTagName("input")[0];
    setTempSearchWord(id.value);
  };

  const handleClick = () => {
    setOpenFilter(false); //closes filter modal
    setSearchWord(tempSearchWord);
    setRepo(repository);
  };

  const handleFilter = () => {
    //will clear search bar when filter button is clicked

    //this triggers the intial fetch, find wher it
    setOpenFilter(true); //opens filter modal
    setFilterSearchWord(tempSearchWord);
    setFilterRepo(repository);
    setFilterWatch(true);
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
        <Col md={10} className="repositories">
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

          {openFilter === true && (
            <>
              <Filter
                filterState={filterWatch}
                closeFilter={setter}
                forks_count={forks_count_setter}
                open_issues_count={open_issues_count_setter}
                stargazers_count={stargazers_count_setter}
                start_date={start_date_setter}
                watchers_count={watchers_count_setter}
                end_date={end_date_setter}
                language={language_setter}
                license={license_setter}
                number_of_comments={number_of_comments_setter}
                number_of_ratings={number_of_ratintgs_setter}
                language_title={language_title_setter}
                license_title={license_title_setter}
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
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default App;
