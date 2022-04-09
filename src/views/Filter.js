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
    console.log(event);

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

  return (
    /*********************filter modal**********************/
    <div className="Home">
      {props.filterState === true && (
        <><h1>Filter</h1><div className="modalBackground">
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
              <div className="titleValue">

              </div>
            </div>
            <div className="body">
              <Container>
                <Row className="date">
                  <Col md="4" className="col-example">
                    <h4>Start Date</h4>
                    <DatePicker
                      selected={dateTracker}
                      onChange={handleStartDate}
                      popperPlacement="left-end"
                      placeholderText="select start date..." />
                  </Col>
                  <Col md="4" className="col-example">
                    <h4>End Date</h4>
                    <DatePicker
                      selected={endDateTracker}
                      popperPlacement="right-end"
                      placeholderText="select end date..."
                      onChange={handleEndDate} />
                  </Col>
                  <Col md="4" className="col-example">
                    <h4>Language</h4>
                    <DropdownButton
                      id="dropdown-item-button"
                      title={languageTitle}
                      onSelect={handleLanguageSelect}
                    >
                      <Dropdown.Item eventKey="C++" as="button">
                        C++
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="C" as="button">
                        C
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="MATLAB" as="button">
                        MATLAB
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
                      onChange={handleForksCount}
                      variant={"primary"}
                      size="sm"
                      value={"min"} />
                  </Col>

                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxForksCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleOpenIssuesCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxOpenIssuesCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="4" className="col-example">
                    <DropdownButton
                      id="dropdown-item-button"
                      title={licenseTitle}
                      onSelect={handleLicenseSelect}
                    >
                      <Dropdown.Item eventKey="MIT" as="button">
                        MIT
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="GNU" as="button">
                        GNU
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="BDS" as="button">
                        BSD
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <h4>Stargazers Count</h4>
                  </Col>
                  <Col md="4">
                    <h4>Comments</h4>
                  </Col>
                  <Col md="4"></Col>
                </Row>
                <Row>
                  <Col md="2" className="col-example">
                    <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleStargazersCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxStargazersCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleNumOfComments}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxNumOfComments}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <h4>Watchers Count</h4>
                  </Col>
                  <Col md="4">
                    <h4>Number of Ratings</h4>
                  </Col>
                  <Col md="4"></Col>
                </Row>
                <Row>
                  <Col md="2" className="col-example">
                    <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleWatchersCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxWatchersCount}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleNumOfRatings}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleMaxNumOfRatings}
                      variant={"primary"}
                      size="sm" />
                  </Col>
                  <Col md="4" className="filtered-search">
                    {/* <Button
      className="search-button"
      variant="contained"
      size="medium"
      onClick={sendIt}
    >
      Filtered Search
    </Button> */}
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div></>
      )}
    </div>
  );
};

export default Filter;
