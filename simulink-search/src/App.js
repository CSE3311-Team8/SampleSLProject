import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './controllers/HomeController';
import Filter from './views/Filter';



function App() {

  //hook for search word
  const [searchWord, setSearchWord] = useState("");
  const [repository, setRepository] = useState("Select Repo Type");
  const [repo, setRepo] = useState("");
 
  

  //search bar title
  const header = "Simulink Search"
  const handleSelect=(e)=>{
    //every time repository changes everything has to change
    
    //document.getElementsByTagName("input")[0].value = "";
    setRepository(e);
    
  }
  
  const handleClick=()=>{

    
    var id=document.getElementsByTagName("input")[0];
    setSearchWord(id.value);
    setRepo(repository);
  
    
  }
  //search bar implemented in App.js so it persists on page, could be done with component
  //home route returns regular search bar
  //filter switches to the filtering page

  /*Table headers must be set to 20%*/
  /*Give bottom margin to tables mapped in regular search*/
 
  return (
     
    <Router>
      <Container className="App">
      <h2>{header}</h2>
        <Row className="search">
          <Col md ='2' className='repositories'>
            <DropdownButton  id="dropdown-item-button" title={repository} onSelect={handleSelect}>
              <Dropdown.Item eventKey = "GitHub" as="button" >GitHub</Dropdown.Item>
              <Dropdown.Item eventKey = "MATC" as="button">MATC</Dropdown.Item>
              <Dropdown.Item eventKey = "All" as="button">All</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md='10' className="search-bar">
            <input className = "searchText" type="text" placeholder='Type your query here...'/>
            <Link to = {'/'}>
              <Button className='search-button' variant="contained" size ='large'onClick={handleClick} >
                Search
              </Button>
            </Link>
            <Link to = {'/filter'}>
              <Button className='search-button' variant="contained" size ='large'  style={{marginLeft : '1%'}}>
                Filter
              </Button>
            </Link>
          </Col>  
        </Row>
        <Row className="items">
          <Col className="item-list" md='12'> 
            <Routes>
              <Route exact path="/" element ={<Home string = {searchWord} string2 ={repo} string3= {repository}/>}/>
              <Route exact path="/filter" element = {<Filter/>}/>
            </Routes>
          </Col>   
        </Row>
      </Container>  
    </Router>
  );
}

export default App;
