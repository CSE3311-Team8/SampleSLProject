import React from "react";
import{ useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-date-picker';

import NumericInput from 'react-numeric-input';
NumericInput.style.input.color = 'blue';





//will contain the login for searching with different field parameters
const Filter = () => {

  //default value for each select drop-down menu
  //all this login can be combine into one component
  //to minimize code lenght, the cod below was created to
  //get a version of the filter page working

  
  //hook for selected value
  //updates return value for each drop down menu
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  // const [value3, setValue3] = useState(getInitialState3);
  // const [value4, setValue4] = useState(getInitialState4);
  // const [value5, setValue5] = useState(getInitialState5);
  // const [value6, setValue6] = useState(getInitialState6);
  // const [value7, setValue7] = useState(getInitialState7);
  // const [value8, setValue8] = useState(getInitialState8);
  // const [value9, setValue9] = useState(getInitialState9);
 

  //these functions handle the what happens when new value is selected from menu
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChange1 = (e) => {
    setValue1(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };
  // const handleChange3 = (e) => {
  //   setValue3(e.target.value);
  // };
  // const handleChange4 = (e) => {
  //   setValue4(e.target.value);
  // };
  // const handleChange5 = (e) => {
  //   setValue5(e.target.value);
  // };
  // const handleChange6 = (e) => {
  //   setValue6(e.target.value);
  // };
  // const handleChange7 = (e) => {
  //   setValue7(e.target.value);
  // };
  // const handleChange8 = (e) => {
  //   setValue8(e.target.value);
  // };
  // const handleChange9 = (e) => {
  //   setValue9(e.target.value);
  // };
 
  //logic for displaying the drowp-down menus
  //will be updated to fit mock up display
  //this is for testings purposes
  return ( 

    <Container>
      <Row className="date">
        <Col md='4' className='col-example'>
          <p>Created At</p>
          <DatePicker onChange={onChange} value={value} />
        </Col>
        <Col md='4' className='col-example'>
          <p>Updated At</p>
          <DatePicker onChange={onChange1} value={value} />
        </Col>
        <Col md='4' className='col-example'>
          <p>License</p>
          <DropdownButton id="dropdown-item-button" title="Select License">
            <Dropdown.ItemText></Dropdown.ItemText>
            <Dropdown.Item as="button">C++</Dropdown.Item>
            <Dropdown.Item as="button">Java</Dropdown.Item>
            <Dropdown.Item as="button">C#</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col md='4' className='col-example'>
          <p>Forks Count</p>
          <NumericInput className="form-control"/> 
        </Col>
        <Col md='4' className='col-example'>
          <p>Open Issues Count</p>
          <NumericInput className="form-control"/>
        </Col>
        <Col md='4' className='col-example'>
          <p>License</p>
          <DropdownButton id="dropdown-item-button" title="Select License">
            <Dropdown.ItemText></Dropdown.ItemText>
            <Dropdown.Item as="button">C++</Dropdown.Item>
            <Dropdown.Item as="button">Java</Dropdown.Item>
            <Dropdown.Item as="button">C#</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col md='4' className='col-example'>
          <p>Stargazers Count</p>
          <NumericInput className="form-control"/>
        </Col>
        <Col md='4' className='col-example'>
          <p>Number of Comments</p>
          <NumericInput className="form-control"/>
        </Col>
      </Row>
      <Row>
        <Col md='4' className='col-example'>
          <p>Watchers Count</p>
          <NumericInput className="form-control"/>
        </Col>
        <Col md='4' className='col-example'>
          <p>Number of Ratings</p>
          <NumericInput className="form-control"/>
        </Col>
        <Col md='4' className='col-example'>
          <button className='search-button' style={{ color: '#345beb', height: "35px"}}>Search
          </button>
        </Col>
      </Row>
    </Container>

  );

}
 
export default Filter;