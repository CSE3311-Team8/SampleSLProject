import React from "react";
import ProjectList from "./ProjectList";
import useFetch from "./useFetch";

const Home = (props) => {

  const {isLoading} = useFetch('http://localhost:8000/items')
  const word =props.string;
  
  return ( 

    <div className="home">
      {isLoading && <div>Searching...</div> } 
      <ProjectList  items = {word}/>
    </div>

  );

}
 
export default Home ;