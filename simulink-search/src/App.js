
import React from 'react';
import Navbar from './Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Filter from './Filter';
import Details from './Details';

function App() {
  
  
  //additional components are nested in App.js
  //Navbar component contains search bar and search logic
  //Each Route below is a path to home page and filter page, respectively
  return (
     
    <Router>
      <div className="App">
      
        
        <div className="content">
          <Navbar/>
          <Routes>
            <Route exact path="/" element ={<Home/>}/>
            <Route exact path="/filter" element = {<Filter/>}/>
            <Route exact path="/items/:id" element = {<Details/>}/>
              
          
          </Routes>
          
        </div>
        
      </div>
    </Router>
  );
}

export default App;
