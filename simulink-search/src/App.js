
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './views/Home';
import { Col, Container, Row } from 'react-bootstrap';
import Filter from './views/Filter';


function App() {

  //hook for search word
  const [searchWord, setSearchWord] = useState("");

  //search bar title
  const title = "Simulink Search"

  //search bar implemented in App.js so it persists on page, could be done with component
  //home route returns regular search bar
  //filter switches to the filtering page

  /*Table headers must be set to 20%*/
  /*Give bottom margin to tables mapped in regular search*/

  return (
     
    <Router>
      <Container className="App">
        <Row className="search">
          <Col md='12' className="search-bar">
            <h2>{title}</h2>
            <input className = "searchText" type="text" placeholder='Type your query here...' style={{}} onChange={(e)=>{ setSearchWord(e.target.value);}}/>
            <Link to = {'/'}>
              <button className='search-button' style={{ color: '#345beb'}}>Search
              </button>
            </Link>

            <Link to = {'/filter'}>
              <button className='filter' style={{ color: '#345beb'}}>Filter</button>
            </Link>
          </Col>  
        </Row>
        <Row className="items">
          <Col className="item-list" md='12'> 
            <Routes>
              <Route exact path="/" element ={<Home string = {searchWord}/>}/>
              <Route exact path="/filter" element = {<Filter/>}/>
            </Routes>
          </Col>   
        </Row>
      </Container>  
      
    </Router>
  );
}

export default App;
