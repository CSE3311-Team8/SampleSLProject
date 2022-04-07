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

  // const upadater = document.querySelectorAll('.form-outline').forEach((formOutline) => {
  //   new NumericInput(formOutline).update();
  // });

  //these functions handle the what happens when new value is selected from menu
  function Change(event) {
    //setForksCount(value);
    //console.log(event.target.value);

    props.forks_count(event);
  }
  function Change2(event) {
    //setOpenIssuesCount(value);
    //console.log(openIssuesCount);
    props.open_issues_count(event);
  }
  function Change3(event) {
    //setStarGazersCount(value);
    //console.log(starGazersCount);
    props.stargazers_count(event);
  }
  function Change4(event) {
    //setWatchersCount(value);
    //console.log(watchersCount);
    props.watchers_count(event);
  }

  function handleNumOfComments(event) {
    //setNumberOfComments(value);
    //console.log(numberOfComments);
    props.number_of_comments(event);
  }
  function handleNumOfRatings(event) {
    //setNumberOfRatings(value);
    //console.log(numberOfRatings);
    props.number_of_ratings(event);
  }

  const handleLanguageSelect = (event) => {
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    //setLanguageTitle(event);
    //setLanguage(event);
    //console.log(language);
    setLanguageTitle(event);
    props.language(event);
    props.language_title(event);
  };
  const handleStartDate = (event) => {
    setDateTracker(event);
    props.start_date(event);
    //log(startDate);
  };
  const handleEndDate = (event) => {
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    //setEndDate(event);
    setEndDateTracker(event);
    props.end_date(event);
  };
  const handleLicenseSelect = (event) => {
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    //setLicenseTitle(event);
    //setLicense(event);
    //console.log(license)
    setLicenseTitle(event);
    props.license(event);
    props.license_title(event);
  };

  return (
    /*********************filter modal**********************/
    <div className="Home">
      {props.filterState === true && (
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
              <div className="titleValue">
                <h1>Filter</h1>
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
                      popperPlacement="top-end"
                      placeholderText="select start date..."
                    />
                  </Col>
                  <Col md="4" className="col-example">
                    <h4>End Date</h4>
                    <DatePicker
                      selected={endDateTracker}
                      popperPlacement="top-end"
                      placeholderText="select end date..."
                      onChange={handleEndDate}
                    />
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
                      onChange={Change}
                      variant={"primary"}
                      size="sm"
                      value={"min"}
                    />
                  </Col>

                  <Col md="2" className="col-example">
                    <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={(num) => console.log(num)}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={Change2}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      variant={"primary"}
                      size="sm"
                    />
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
                      onChange={Change3}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
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
                      variant={"primary"}
                      size="sm"
                    />
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
                      onChange={Change4}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>min:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      onChange={handleNumOfRatings}
                      variant={"primary"}
                      size="sm"
                    />
                  </Col>
                  <Col md="2" className="col-example">
                  <h5>max:</h5>
                    <InputSpinner
                      type={"natural"}
                      min={0}
                      variant={"primary"}
                      size="sm"
                    />
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
        </div>
      )}
    </div>
  );
};

export default Filter;
