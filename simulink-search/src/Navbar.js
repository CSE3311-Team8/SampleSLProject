import React from 'react';
import ProjectList from "./ProjectList";
import useFetch from "./useFetch";
import {Link} from 'react-router-dom'

//contains search bar
const Navbar = () => {
  
  //maing title
  const title = 'Simulink Search';


  //will handle normal search logic
  const handleFilter = (e) =>{

    const inputText = e.target.value

  }
  //the code below contains the text input bar plus  search and filter buttons
  //onChange function will update every time text in search input bar changes
  return ( 
    <nav className="navbar">
      <div className="search">
        
        <h2>{title}</h2>
        
          <input className = "searchText" type="text" placeholder='Type your query here...' style={{fontSize: "16px",  width:"400px", height: "30px" }} onChange={handleFilter}/>

          <Link to = {'/'}>
            <button className='search-button' style={{ color: '#345beb', height: "35px"}}>Search</button>
          </Link>

          <Link to = {'/filter'}>
            <button className='filter' style={{ color: '#345beb', height: "35px"}}>Filter</button>
          </Link>

      </div>
    </nav>

   );
}
 
export default Navbar;