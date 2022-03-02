
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Filter from './Filter';
import Details from './Details';

function App() {

  //hook for
  const [searchWord, setSearchWord] = useState("");

  const title = "Simulink Search"
  
  
  //Each Route below is a path to home page and filter page, respectively
  return (
     
    <Router>
      <div className="App">
        <div className="search">
          <h2>{title}</h2>

            <input className = "searchText" type="text" placeholder='Type your query here...' style={{fontSize: "16px",  width:"650px", height: "30px" }} onChange={(e)=>{
              
              setSearchWord(e.target.value);

            }}/>

            <Link to = {'/'}>
              <button className='search-button' style={{ color: '#345beb', height: "35px"}}>Search
              </button>
            </Link>

            <Link to = {'/filter'}>
              <button className='filter' style={{ color: '#345beb', height: "35px"}}>Filter</button>
            </Link>

        </div>
        <div className="content">
        
          <Routes>
            <Route exact path="/" element ={<Home string = {searchWord}/>}/>
            <Route exact path="/filter" element = {<Filter/>}/>
            <Route exact path="/items/:id" element = {<Details/>}/>a
          </Routes>
          
        </div>
      </div>  
      
    </Router>
  );
}

export default App;
