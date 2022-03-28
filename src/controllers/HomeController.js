import React from "react";
import ProjectList from "../views/ProjectList";
import useFetch from "./useFetch";


//Hosts the lists of projects matching search word
const Home = (props) => {

  const word =props.string;
  const database = props.string2;
  
  //will display a load effect between searches
  const {isLoading, datas} = useFetch(database, word);
  const filteredItems = datas.filter( p =>{
    if(word === "")
    {
      return "";    
    }
    else if(p.Description)
    {
      return p.Description.toLowerCase().match(word.toLowerCase());
    } else if(p.content)
    {
      return p.content.toLowerCase().match(word.toLowerCase());
    }
    return "";
  });
  
  //the prop "word" comes from search bar and will be 
  //the filtering parameter used for project filtering
  return ( 
    <div className="home">
      {isLoading && <div>Loading...</div> } 
      <ProjectList  items ={filteredItems} repository = {database} word = {word}/>
    </div>
  );
}
 
export default Home ;