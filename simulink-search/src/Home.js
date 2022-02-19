import React from "react";
import ProjectList from "./ProjectList";
import useFetch from "./useFetch";

const Home = () => {

  //main data request, needs to updated for searching
  //currently displaying all contents of table 
  const {data, isLoading} = useFetch('http://localhost:8000/items')
  
  //title for found searches
  const title = "Found projects: "

  //the code below calls the ProjecList component and passes the data requested above as a prop
  return ( 

    <div className="home">
      <h2>{title}</h2>

        {isLoading && <div>Searching...</div> } 
        <ProjectList  items ={data}/>
    
    </div>
   );
}
 
export default Home ;