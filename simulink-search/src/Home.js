import React from "react";
import ProjectList from "./ProjectList";
import useFetch from "./useFetch";

//Hosts the lists of projects matching search word
const Home = (props) => {

  //will display a load effect between searches
  const {isLoading} = useFetch('http://localhost:8000/items')
  const word =props.string;

  //the prop "word" comes from search bar and will be 
  //the filtering parameter used for project filtering
  return ( 
    <div className="home">
      {isLoading && <div>Searching...</div> } 
      <ProjectList  items = {word}/>
    </div>
  );

}
 
export default Home ;