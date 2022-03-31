import React from "react";

import ProjectList from "./ProjectList";

import{ useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-date-picker';
import useFetch from "../controllers/useFetch";
import { Button } from '@mui/material';
import NumericInput from 'react-numeric-input';
NumericInput.style.input.color = 'blue';

//will contain the login for searching with different field parameters

const Filter = (
  props
) => {

  //need to pass repository and searchword
  //the change on word needs to register in useFetch 
  const {isLoading, datas} = useFetch(props.repo, props.word);


  //default value for each select drop-down menu
  //all this login can be combine into one component
  //to minimize code lenght, the cod below was created to
  //get a version of the filter page working

  //hook for selected value
  //updates return value for each drop down menu
  const [forksCount, setValue] = useState(0);
  const [openIssuesCount, setValue1] = useState(0);
  const [starGazersCount, setValue2] = useState(0);
  const [watchersCount, setValue3] = useState(0);

  const[tempFilterdItems, setFilteredItems] = useState([]);

  //these functions handle the what happens when new value is selected from menu

  function Change (value) {
    setValue(value);
    console.log(forksCount);
  };
  function Change2 (value) {
    setValue1(value);
    console.log(openIssuesCount);
  };
  function Change3 (value) {
    setValue2(value);
    console.log(starGazersCount);
  };
  function Change4 (value) {
    setValue3(value);
    console.log(watchersCount);
  };
  //console.log(data);
  const filteredItems = datas.filter( p =>{
    
    if(forksCount === 0)
    {
      return 0;
    }
    else 
    {                          

      //console.log(toString(p.forks_count).match(toString(forksCount)));

      return toString(p.forks_count).match(toString(forksCount));
    }
  });
  
  const sendIt =()=>{

    setFilteredItems(filteredItems);
    console.log(filteredItems);
    console.log(props.word);
    console.log(props.repo);
    props.setSearch(props.word);



  }
  //logic for displaying the drowp-down menus
  //will be updated to fit mock up display
  //all fields below will be combined into a single data request
  return ( 
   
    /*********************filter modal**********************/

    <div className="Home">
      {props.filterState === true &&
      <div className="modalBackground">
        
        <div className="modalContainer">
            <div className="title">
              <div className="closeButton">
                <Button className='searchButton' variant="contained" size ='small' onClick = {()=>(
                  props.closeFilter(false))}>X</Button>
              </div>
              <div className="titleValue">
                <h1>Filtered Search</h1>
              </div>
            </div>
            <div className="body">
              <Container>
                <Row className="date">
                  <Col md='4' className='col-example'>
                    <p>Start Date:</p>
                    <DatePicker   />
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>End Date:</p>
                    <DatePicker   />
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>Language:</p>
                    <DropdownButton id="dropdown-item-button" title="Select Language">
                      <Dropdown.ItemText></Dropdown.ItemText>
                      <Dropdown.Item as="button">C++</Dropdown.Item>
                      <Dropdown.Item as="button">Java</Dropdown.Item>
                      <Dropdown.Item as="button">C#</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Row>
                  <Col md='4' className='col-example'>
                    <p>Forks Count:</p>
                    <NumericInput min={0} className="form-control"onChange={Change}/> 
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>Open Issues Count:</p>
                    <NumericInput min={0} className="form-control"onChange={Change2}/>
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>License:</p>
                    <DropdownButton id="dropdown-item-button" title="Select License">
                      <Dropdown.ItemText></Dropdown.ItemText>
                      <Dropdown.Item as="button">MIT</Dropdown.Item>
                      <Dropdown.Item as="button">GNU</Dropdown.Item>
                      <Dropdown.Item as="button">BSD</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Row>
                  <Col md='4' className='col-example'>
                    <p>Stargazers Count:</p>
                    <NumericInput min={0} className="form-control" onChange={Change3}/>
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>Number of Comments:</p>
                    <NumericInput min={0} className="form-control" />
                  </Col>
                </Row>
                <Row>
                  <Col md='4' className='col-example'>
                    <p>Watchers Count:</p>
                    <NumericInput min={0} className="form-control"onChange={Change4}/>
                  </Col>
                  <Col md='4' className='col-example'>
                    <p>Number of Ratings:</p>
                    <NumericInput min={0} className="form-control"/>
                  </Col>
                  <Col md='4' className='filtered-search'>
                    <Button className='search-button' variant="contained" size ='medium' onClick={sendIt}>
                      Filtered Search
                    </Button> 
                  </Col>
                </Row>
              </Container>
            </div>
        </div>  
      </div>
      }
      {isLoading && <div>Searching...</div> }
      <ProjectList  items ={tempFilterdItems} repository = {props.repo} word = {props.word}/>
    </div>
    
   
     
  

  );
}
 
export default Filter;