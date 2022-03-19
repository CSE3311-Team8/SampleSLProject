import { Col, Container, Form, FormControl, FormGroup, InputGroup, Row } from 'react-bootstrap';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Home from './controllers/HomeController';
import Filter from './views/Filter';



function App() {

  //hook for search word
  const [searchWord, setSearchWord] = useState("");
  const [tempSearchWord, setTempSearchWord] = useState("");
  const [repository, setRepository] = useState("TYPE");
  const [repo, setRepo] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  //search bar title
  const header = "Simulink Search"
  const handleSelect=(event)=>{
    //every time repository changes everything has to change
    //document.getElementsByTagName("input")[0].value = "";
    
    setRepository(event);
   
  }

  const setter = () =>{
    
    setOpenFilter(false);
    
  }
  
  const handleChange=()=>{
    var id=document.getElementsByTagName("input")[0];
    setTempSearchWord(id.value);
  }

  const handleClick=()=>{
    setOpenFilter(false);
    setSearchWord(tempSearchWord);
    setRepo(repository);
  }

  const handleFilter=()=>{
    setSearchWord("");
    setOpenFilter(true);
  }

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
        <Col md = {1}>
          <DropdownButton  id="dropdown-item-button" style={{marginBottom : '5%'}} title={repository} onSelect={handleSelect}>
            <Dropdown.Item eventKey = "GitHub" as="button" >GitHub</Dropdown.Item>
            <Dropdown.Item eventKey = "MATC" as="button">MATC</Dropdown.Item>
            <Dropdown.Item eventKey = "All" as="button">All</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md = {10} className='repositories'>
          <Form>
            <FormGroup>
              <InputGroup>
                <FormControl placeholder='Search here...' onChange={handleChange} md = {8}/>
                  <Button md = {1} className='search-button' variant="contained" size ='medium' onClick={handleClick} >
                  Search
                  </Button>
                  <Button  md = {1} className='filter-button' variant="contained" size ='medium'   onClick = {handleFilter}>
                    Filter
                  </Button>
              </InputGroup> 
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row className="items">
        <Col className="item-list" md='12'> 
            <Home string = {searchWord} string2 ={repo} string3= {repository}/>
            {openFilter === true && <Filter closeFilter = {setter}/>}
        </Col>   
      </Row>
    </Container>  
  );
}
export default App;
