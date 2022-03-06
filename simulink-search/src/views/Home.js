import React from "react";
import ProjectList from "./ProjectList";
import useFetch from "../controllers/useFetch";


//Hosts the lists of projects matching search word
const Home = (props) => {

  //will display a load effect between searches
  const {isLoading, data} = useFetch('http://localhost:8000/items')
  const word =props.string;
  
  const filteredItems = data.filter( p =>{
    
    if(word === "")
    {
     
       
      return "";
    }
    else 
    {
      return p.Description.toLowerCase().match(word.toLowerCase());
    }
    
  });
  
  //the prop "word" comes from search bar and will be 
  //the filtering parameter used for project filtering
  return ( 
    <div className="home">
      {isLoading && <div>Searching...</div> } 
      <ProjectList  items ={filteredItems} />
    </div>
  );

}
 
export default Home ;