
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Filter from './Filter';


function App() {

  //hook for search word
  const [searchWord, setSearchWord] = useState("");

  //search bar title
  const title = "Simulink Search"

  //search bar implemented in App.js so it persists on page, could be done with component
  //home route returns regular search bar
  //filter switches to the filtering page
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
          </Routes>
          
        </div>
      </div>  
      
    </Router>
  );
}

export default App;
