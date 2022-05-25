import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import { Button } from "@mui/material";
import NumericInput from "react-numeric-input";
import InputSpinner from "react-bootstrap-input-spinner";
//import { eventListeners } from "@popperjs/core";

NumericInput.style.input.color = "blue";

//will contain the login for searching with different field parameters
//props here are the word in the search bar and the repo selected

const Filter = (props) => {
  const [languageTitle, setLanguageTitle] = useState("Select Language");
  const [licenseTitle, setLicenseTitle] = useState("Select License");
  const [dateTracker, setDateTracker] = useState();
  const [endDateTracker, setEndDateTracker] = useState();

  //const filteredSearchTrigger = props.filteredSearchTrigger;

  //these functions handle the what happens when new value is selected from menu
  function handleForksCount(event) {
    //console.log(event);

    props.forks_count(event);
  }
  function handleOpenIssuesCount(event) {
    props.open_issues_count(event);
  }
  function handleStargazersCount(event) {
    props.stargazers_count(event);
  }
  function handleWatchersCount(event) {
    props.watchers_count(event);
  }

  function handleNumOfComments(event) {
    props.number_of_comments(event);
  }
  function handleNumOfRatings(event) {
    props.number_of_ratings(event);
  }
  function handleMaxForksCount(event) {
    props.max_forks_count(event);
  }
  function handleMaxOpenIssuesCount(event) {
    props.max_open_issues_count(event);
  }
  function handleMaxStargazersCount(event) {
    props.max_stargazers_count(event);
  }
  function handleMaxWatchersCount(event) {
    props.max_watchers_count(event);
  }

  function handleMaxNumOfComments(event) {
    props.max_number_of_comments(event);
  }
  function handleMaxNumOfRatings(event) {
    props.max_number_of_ratings(event);
  }

  const handleLanguageSelect = (event) => {
    setLanguageTitle(event);
    props.language(event);
    props.language_title(event);
  };
  const handleStartDate = (event) => {
    setDateTracker(event);
    props.start_date(event);
  };
  const handleEndDate = (event) => {
    setEndDateTracker(event);
    props.end_date(event);
  };
  const handleLicenseSelect = (event) => {
    setLicenseTitle(event);
    props.license(event);
    props.license_title(event);
  };
  function filteredSearchTrigger(event) {
    props.filteredSearchTrigger(event);
  }
  const handleNumDownloads = (e) => {
    props.downloads(e);
  };
  const handleMaxNumOfDownloads = (e) => {
    props.downloads(e);
  };

  return (
    /*********************filter modal**********************/
    <div className="Home">
      {props.filterState === true && (
        <>
          <h1>Filter</h1>
          <div className="modalBackground">
            <div className="modalContainer">
              <div className="title">
                <div className="closeButton">
                  <Button
                    className="searchButton"
                    variant="contained"
                    size="small"
                    onClick={() => props.closeFilter(true)}
                  >
                    X
                  </Button>
                </div>
                <div className="titleValue"></div>
              </div>
              <div className="body">
                <Container>
                  <Row className="date">
                    <Col md="4" className="col-example">
                      <h4>From</h4>
                      <DatePicker
                        selected={dateTracker}
                        onChange={handleStartDate}
                        popperPlacement="left-end"
                        placeholderText="select start date..."
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <h4>To</h4>
                      <DatePicker
                        selected={endDateTracker}
                        popperPlacement="right-end"
                        placeholderText="select end date..."
                        onChange={handleEndDate}
                      />
                    </Col>

                    <Col md="4" className="col-example">
                      <h4>Language</h4>
                      <DropdownButton
                        id="dropdown-item-button"
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        title={languageTitle}
                        onSelect={handleLanguageSelect}
                      >
                        <Dropdown.Item eventKey="C++" as="button">
                          C++
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="C" as="button">
                          C
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Matlab" as="button">
                          Matlab
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="MATLAB" as="button">
                          MATLAB
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="HTML" as="button">
                          HTML
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Verilog" as="button">
                          Verilog
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Java" as="button">
                          Java
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Python" as="button">
                          Python
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Jupyter Notebook" as="button">
                          Jupyter Notebook
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mercury" as="button">
                          Mercury
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="C#" as="button">
                          C#
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="XSLT" as="button">
                          XSLT
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Forks Count</h4>
                    </Col>

                    <Col md="4">
                      <h4>Open Issues Count</h4>
                    </Col>

                    <Col md="4">
                      <h4>License</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onChange={handleForksCount}
                        variant={"primary"}
                        size="sm"
                        value={"min"}
                      />
                    </Col>

                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        min={0}
                        onChange={handleMaxForksCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>

                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onChange={handleOpenIssuesCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onChange={handleMaxOpenIssuesCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <DropdownButton
                        id="dropdown-item-button"
                        title={licenseTitle}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onSelect={handleLicenseSelect}
                      >
                        <Dropdown.Item
                          eventKey="Apache License 2.0"
                          as="button"
                        >
                          Apache License 2.0
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="BSD 2-Clause" as="button">
                          BSD 2-Clause
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="BSD 3-Clause" as="button">
                          BSD 3-Clause
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="GNU General Public License v3.0"
                          as="button"
                        >
                          GNU v3.0
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Eclipse Public License 1.0"
                          as="button"
                        >
                          Eclipse Public License 1.0
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="GNU Affero General Public License v3.0"
                          as="button"
                        >
                          GNU Affero v3.0
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="MIT License" as="button">
                          MIT
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Mozilla Public License 2.0"
                          as="button"
                        >
                          Mozilla Public License 2.0
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="other" as="button">
                          other
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="" as="button">
                          no selection
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Stargazers Count</h4>
                    </Col>
                    <Col md="4">
                      <h4>Watchers Count</h4>
                    </Col>
                    {/* <Col md="4">
                      <h4>Downloads</h4>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleStargazersCount}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxStargazersCount}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleWatchersCount}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxWatchersCount}
                        disabled={
                          props.repository === "GitHub" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    {/* <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled = {(props.repository === "MATC" || props.repository === "All") ? false : true}
                        onChange={handleNumDownloads}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled = {(props.repository === "MATC" || props.repository === "All") ? false : true}
                        onChange={handleMaxNumOfDownloads}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Number of Ratings</h4>
                    </Col>

                    <Col md="4">
                      <h4>Comments</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleNumOfRatings}
                        variant={"primary"}
                        disabled={
                          props.repository === "MATC" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxNumOfRatings}
                        disabled={
                          props.repository === "MATC" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled={
                          props.repository === "MATC" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onChange={handleNumOfComments}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        disabled={
                          props.repository === "MATC" ||
                          props.repository === "All"
                            ? false
                            : true
                        }
                        onChange={handleMaxNumOfComments}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>

                    <Col md="4">
                      <Button
                        className="search-button"
                        variant="contained"
                        size="medium"
                        onClick={filteredSearchTrigger}
                      >
                        Filtered Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
