import { getSuggestedQuery } from "@testing-library/react";
import { useState } from "react";




const Navbar = () => {

  //receives event object e
  const handleSearchClick =(e)=>{
    console.log('Search click', e);
  }
  //this function receives it directly in anonymous function
  const handleFilterClick =(action, e)=>{
     
    console.log('Filter ' + action, e.target);
  }

  return ( 
<nav className="navbar">
  <div className="search">
    
     <label>Search</label>
     <input type="text"/>
  <button onClick={handleSearchClick}>Search</button>

  <button onClick={(e) => handleFilterClick('click', e)}>Filter </button>

  </div>
</nav>

   );
}
 
export default Navbar;