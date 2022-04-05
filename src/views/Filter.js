import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import { Button } from "@mui/material";
import NumericInput from "react-numeric-input";
import "react-datepicker/dist/react-datepicker.css";


NumericInput.style.input.color = "blue";

//will contain the login for searching with different field parameters
//props here are the word in the search bar and the repo selected

const Filter = (props) => {

  
  const [languageTitle, setLanguageTitle] = useState("Select Language");
  const [licenseTitle, setLicenseTitle] = useState("Select License");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //these functions handle the what happens when new value is selected from menu
  function Change(event) {
    //setForksCount(value);
    //console.log(event.target.value);
    props.forks_count(event.target.value);
  }
  function Change2(event) {
    //setOpenIssuesCount(value);
    //console.log(openIssuesCount);
    props.open_issues_count(event.target.value);
  }
  function Change3(event) {
    //setStarGazersCount(value);
    //console.log(starGazersCount);
    props.stargazers_count(event.target.value);
  }
  function Change4(event) {
    //setWatchersCount(value);
    //console.log(watchersCount);
    props.watchers_count(event.target.value);
  }

  function handleNumOfComments(event) {
    //setNumberOfComments(value);
    //console.log(numberOfComments);
    props.number_of_comments(event.target.value);
  }
  function handleNumOfRatings(event) {
    //setNumberOfRatings(value);
    //console.log(numberOfRatings);
    props.number_of_ratings(event.target.value);
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
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    //setStartDate(event);
    console.log(event);
    setStartDate(event);
    props.start_date(event);
  };
  const handleEndDate = (event) => {
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    setEndDate(event);
    console.log(event);
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
                <h1>Filtered Search</h1>
              </div>
            </div>
            <div className="body">
              <Container>
                <Row className="date">
                  <Col md="4" className="col-example">
                    <p>Start Date:</p>
                    <DatePicker selected={startDate} onChange={handleStartDate} />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>End Date:</p>
                    <DatePicker selected={endDate} onChange={handleEndDate} />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>Language:</p>
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
                  <Col md="4" className="col-example">
                    <p>Forks Count:</p>
                    {/* <NumericInput
                      min={0}
                      className="form-control"
                      onChange={Change}
                    /> */}
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={Change}
                    />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>Open Issues Count:</p>
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={Change2}
                    />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>License:</p>
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
                  <Col md="4" className="col-example">
                    <p>Stargazers Count:</p>
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={Change3}
                    />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>Number of Comments:</p>
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={handleNumOfComments}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className="col-example">
                    <p>Watchers Count:</p>
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={Change4}
                    />
                  </Col>
                  <Col md="4" className="col-example">
                    <p>Number of Ratings:</p>
                    <MDBInput
                      min="0"
                      className="form-control"
                      id="typeNumber"
                      type="number"
                      onChange={handleNumOfRatings}
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
