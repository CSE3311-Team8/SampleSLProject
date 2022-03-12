import React from "react";
import ProjectList from "../views/ProjectList";
import useFetch from "./useFetch";


//Hosts the lists of projects matching search word
const Home = (props) => {

  const word =props.string;
  const database = props.string2;
  const repository = props.string3;
  console.log(repository);
  //will display a load effect between searches
  
  const {isLoading, datas} = useFetch(database, word);
  console.log(datas);
 
  const filteredItems = datas.filter( p =>{
   ///this condition is the problem
   /*****************************************************/
     
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
      {isLoading && <div>Searching...</div> } 
      <ProjectList  items ={filteredItems} repository = {database} word = {word}/>
    </div>
  );

}
 
export default Home ;